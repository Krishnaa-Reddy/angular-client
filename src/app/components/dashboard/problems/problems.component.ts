import { SelectionModel } from '@angular/cdk/collections';
import { DecimalPipe, TitleCasePipe } from '@angular/common';
import {
  Component,
  Signal,
  TrackByFunction,
  computed,
  effect,
  inject,
  input,
  signal
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  lucideArrowUpDown,
  lucideChevronDown,
  lucideChevronRight,
  lucideMoreHorizontal,
  lucideMoveUpRight,
} from '@ng-icons/lucide';
import { HlmButtonModule } from '@spartan-ng/ui-button-helm';
import {
  HlmCheckboxCheckIconComponent,
  HlmCheckboxComponent,
} from '@spartan-ng/ui-checkbox-helm';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';

import { RouterLink } from '@angular/router';
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm';
import { BrnSelectModule } from '@spartan-ng/ui-select-brain';
import { HlmSelectModule } from '@spartan-ng/ui-select-helm';
import {
  BrnTableModule,
  PaginatorState,
  useBrnColumnManager,
} from '@spartan-ng/ui-table-brain';
import { HlmTableModule } from '@spartan-ng/ui-table-helm';
import { debounceTime, map } from 'rxjs';
import { Problem } from '../../../../types/problem.type';
import { DsaServerService } from '../../../services/dsa-server.service';
import { ChartComponent } from '../../shared/chart/chart.component';
import { ProblemStatusComponent } from '../problem-status/problem-status.component';

// Most important!!!!!!!!!: Use signals as much as you can
///// And, Deplpoy the code first before you plan any new advancements or features

// TODO: Sorting not working look at it.
// PARTIALLY_DONE: Introduce images
// PARTIALLY_DONE: Make next & prev buttons work - not good, only back

// Backend:
// 0. Started with hard-coded data in the backend
// 1. Read google sheets
// 2. If needed integrate with AI
// 3. Structure the code well

@Component({
  selector: 'app-problems',
  standalone: true,
  imports: [
    FormsModule,
    BrnTableModule,
    HlmTableModule,
    HlmBadgeDirective,
    HlmButtonModule,

    DecimalPipe,
    TitleCasePipe,
    HlmIconComponent,
    HlmInputDirective,
    RouterLink,
    MatIcon,
    MatRippleModule,

    HlmCheckboxCheckIconComponent,
    HlmCheckboxComponent,

    BrnSelectModule,
    HlmSelectModule,
    MatTooltipModule,
    ReactiveFormsModule,
    ChartComponent,
    ProblemStatusComponent
  ],
  providers: [
    provideIcons({
      lucideChevronDown,
      lucideMoreHorizontal,
      lucideMoveUpRight,
      lucideChevronRight,
      lucideArrowUpDown,
    }),
  ],
  templateUrl: './problems.component.html',
  styleUrl: './problems.component.scss',
})
export class ProblemsComponent {
  protected readonly 'topic-name' = input(undefined);
  private readonly _service = inject(DsaServerService);
  element = "";

  protected readonly _rawFilterInput = signal('');
  protected readonly _problemFilter = signal('');
  private readonly _debouncedFilter = toSignal(
    toObservable(this._rawFilterInput).pipe(debounceTime(300))
  );

  private readonly _displayedIndices = signal({ start: 0, end: 0 });
  protected readonly _availablePageSizes = [5, 10, 20, 100];
  protected readonly _pageSize = signal(this._availablePageSizes[0]);

  private readonly _selectionModel = new SelectionModel<Problem>(true);
  protected readonly _isProblemSelected = (problem: Problem) =>
    this._selectionModel.isSelected(problem);
  protected readonly _selected = toSignal(
    this._selectionModel.changed.pipe(map((change) => change.source.selected)),
    {
      initialValue: [],
    }
  );

  protected readonly _brnColumnManager = useBrnColumnManager({
    difficulty: { visible: true, label: 'Difficulty' },
    statement: { visible: true, label: 'Problem Statement' },
    status: { visible: true, label: 'Status' },
  });
  protected readonly _allDisplayedColumns = computed(() => [
    'select',
    ...this._brnColumnManager.displayedColumns(),
    'actions',
  ]);
  
  _topicWiseProblems : Signal<{topic: string | undefined, problems: Problem[]}> = computed(() => {
    const topic = this._service._topicRoute()?.title
    return {
      topic,
      problems: this._service._problems()?.filter((p) => p.topics?.includes(topic ?? '')) ?? []
    }
    
  })

  protected readonly _problems = computed(() => this._topicWiseProblems().problems);

  private readonly _filteredProblems = computed(() => {
    const problemFilter = this._problemFilter()?.trim()?.toLowerCase();
    if (problemFilter && problemFilter.length > 0) {
      return this._problems().filter((u) =>
        u.statement.toLowerCase().includes(problemFilter)
      );
    }
    return this._problems();
  });
  private readonly _problemSort = signal<'ASC' | 'DESC' | null>(null);
  protected readonly _filteredSortedPaginatedProblems = computed(() => {
    const sort = this._problemSort();
    const start = this._displayedIndices().start;
    const end = this._displayedIndices().end + 1;
    const problems = this._filteredProblems();
    if (!sort) {
      return problems.slice(start, end);
    }
    return [...problems]
      .sort(
        (p1, p2) =>
          (sort === 'ASC' ? 1 : -1) * p1.statement.localeCompare(p2.statement)
      )
      .slice(start, end);
  });
  protected readonly _allFilteredPaginatedProblemsSelected = computed(() =>
    this._filteredSortedPaginatedProblems().every((problem) =>
      this._selected().includes(problem)
    )
  );
  protected readonly _checkboxState = computed(() => {
    const noneSelected = this._selected().length === 0;
    const allSelectedOrIndeterminate =
      this._allFilteredPaginatedProblemsSelected() ? true : 'indeterminate';
    return noneSelected ? false : allSelectedOrIndeterminate;
  });

  protected readonly _trackBy: TrackByFunction<Problem> = (
    _: number,
    p: Problem
  ) => p.id;
  protected readonly _totalElements = computed(
    () => this._filteredProblems().length
  );
  protected readonly _onStateChange = ({
    startIndex,
    endIndex,
  }: PaginatorState) =>
    this._displayedIndices.set({ start: startIndex, end: endIndex });

  constructor() {
    effect(() => this._problemFilter.set(this._debouncedFilter() ?? ''), {
      allowSignalWrites: true,
    });

    effect(() => this._service._topic.set(this['topic-name']()), {allowSignalWrites: true});

  }

  protected toggleProblem(problem: Problem) {
    this._selectionModel.toggle(problem);
  }

  protected handleHeaderCheckboxChange() {
    const previousCbState = this._checkboxState();
    if (previousCbState === 'indeterminate' || !previousCbState) {
      this._selectionModel.select(...this._filteredSortedPaginatedProblems());
    } else {
      this._selectionModel.deselect(...this._filteredSortedPaginatedProblems());
    }
  }
}
