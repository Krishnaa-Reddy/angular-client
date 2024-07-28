import { AsyncPipe, JsonPipe, NgIf, TitleCasePipe } from '@angular/common';
import { Component, Input, computed, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  lucideBadgeCheck,
  lucideBan,
  lucideChevronLeft,
  lucideChevronRight,
  lucideChevronsLeft,
  lucideChevronsRight,
  lucideClock2,
} from '@ng-icons/lucide';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';
import { AngularSplitModule } from 'angular-split';
import { DsaServerService } from '../../../services/dsa-server.service';
import { Problem } from '../../../../types/problem.type';



@Component({
  selector: 'app-problem-content',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    HlmIconComponent,
    MatTooltipModule,
    AngularSplitModule,
    MatCardModule,
    MatChipsModule,
    MatChipsModule,
    JsonPipe,
    TitleCasePipe,
    HlmSpinnerComponent,
    NgIf,
  ],
  providers: [
    provideIcons({
      lucideChevronsLeft,
      lucideChevronLeft,
      lucideChevronRight,
      lucideChevronsRight,
      lucideBadgeCheck,
      lucideClock2,
      lucideBan,
    }),
  ],
  templateUrl: './problem-content.component.html',
  styleUrl: './problem-content.component.scss',
})
export class ProblemContentComponent {
  @Input() id!: string;

  private _service = inject(DsaServerService);
  private route = inject(ActivatedRoute);
  protected readonly backTo = this.route.snapshot.params['topic-name'];

  protected prob = computed(() => {
    // TODO: Maybe you might be creating a separate end-point to fetch each solution from server
    /// So, this response will have few more attributes(eg: status: Loading, Loaded, Errored) to handle template state
    return this._service._problems()?.find(p => p.id === this.id)
  });
}
