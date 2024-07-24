import { SelectionModel } from '@angular/cdk/collections';
import { DecimalPipe, TitleCasePipe } from '@angular/common';
import {
  Component,
  TrackByFunction,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
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
// eslint-disable-next-line @nx/enforce-module-boundaries
// import { DsaServerService } from 'src/app/services/dsa-server.service';
// eslint-disable-next-line @nx/enforce-module-boundaries
// import { RoutingService } from 'src/app/services/routing.service';
import { TopicRoute } from '../dashboard.component';
import { DsaServerService } from '../../../services/dsa-server.service';
import { RoutingService } from '../../../services/routing.service';

export type Problem = {
  id: string;
  difficulty: 'hard' | 'medium' | 'easy';
  status: 'solved' | 'pending' | 'unattempted';
  statement: string;
  solution?: Solution[];
  url?: string | string[];
  topics?: string | string[];
  companiesAsked?: string[];
};

export type Solution = {
  approach: 'approach-1' | 'approach-2' | 'approach-3';
  algorithm: string;
  images: string[];
};

// Most important!!!!!!!!!: Use signals as much as you can
///// And, Deplpoy the code first before you plan any new advancements or features

// TODO: Sorting not working look at it.
// TODO: Problem content - add left: solution pane & right: code snipper pane - draggable panes
// TODO: give user a choice to move panes left-right or top-bottom
// TODO: Introduce images
// TODO: Make next & prev buttons work
// TODO: Bring in pie charts

/// TODO: Structure reuseful tailwind css classes

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
  private readonly _router = inject(RoutingService);
  private readonly _service = inject(DsaServerService);

  protected readonly _rawFilterInput = signal('');
  protected readonly _problemFilter = signal('');
  private readonly _debouncedFilter = toSignal(
    toObservable(this._rawFilterInput).pipe(debounceTime(300))
  );

  private readonly _displayedIndices = signal({ start: 0, end: 0 });
  protected readonly _availablePageSizes = [5, 10, 20, 100];
  protected readonly _pageSize = signal(this._availablePageSizes[0]);

  private readonly _selectionModel = new SelectionModel<Problem>(true);
  protected readonly _isPaymentSelected = (problem: Problem) =>
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

  private readonly _problems = signal<Problem[]>([]);

  private readonly topic$ = this._router.topic$;
  private readonly _topic = toSignal(this.topic$, { initialValue: 'no-data' });

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
  protected readonly _filteredSortedPaginatedPayments = computed(() => {
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
  protected readonly _allFilteredPaginatedPaymentsSelected = computed(() =>
    this._filteredSortedPaginatedPayments().every((problem) =>
      this._selected().includes(problem)
    )
  );
  protected readonly _checkboxState = computed(() => {
    const noneSelected = this._selected().length === 0;
    const allSelectedOrIndeterminate =
      this._allFilteredPaginatedPaymentsSelected() ? true : 'indeterminate';
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
    // needed to sync the debounced filter to the name filter, but being able to override the
    // filter when loading new users without debounce
    effect(() => this._problemFilter.set(this._debouncedFilter() ?? ''), {
      allowSignalWrites: true,
    });
    effect(
      () => {
        const topic = this._service
          ._topics()
          ?.find((t: TopicRoute) => t.path === this._topic());
        this._problems.set(
          this._service
            ._problems()
            ?.filter((p) => p.topics?.includes(topic?.title ?? ''))
        );
      },
      { allowSignalWrites: true }
    );
  }

  protected togglePayment(problem: Problem) {
    this._selectionModel.toggle(problem);
  }

  protected handleHeaderCheckboxChange() {
    const previousCbState = this._checkboxState();
    if (previousCbState === 'indeterminate' || !previousCbState) {
      this._selectionModel.select(...this._filteredSortedPaginatedPayments());
    } else {
      this._selectionModel.deselect(...this._filteredSortedPaginatedPayments());
    }
  }

  protected handleEmailSortChange() {
    const sort = this._problemSort();
    if (sort === 'ASC') {
      this._problemSort.set('DESC');
    } else if (sort === 'DESC') {
      this._problemSort.set(null);
    } else {
      this._problemSort.set('ASC');
    }
  }
}