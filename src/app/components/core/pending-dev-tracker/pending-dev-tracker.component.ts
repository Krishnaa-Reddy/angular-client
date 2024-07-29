import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { provideIcons } from '@ng-icons/core';
import { lucideBadgeCheck, lucideBan, lucideChevronLeft, lucideChevronRight, lucideChevronsLeft, lucideChevronsRight, lucideClock2 } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { BrnDialogContentDirective, BrnDialogTriggerDirective } from '@spartan-ng/ui-dialog-brain';
import { HlmDialogComponent, HlmDialogContentComponent, HlmDialogDescriptionDirective, HlmDialogFooterComponent, HlmDialogHeaderComponent, HlmDialogTitleDirective } from '@spartan-ng/ui-dialog-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmCaptionComponent, HlmTableComponent, HlmTdComponent, HlmThComponent, HlmTrowComponent } from '@spartan-ng/ui-table-helm';
import { statusTemplates } from '../../../../constants/statuses.constant';
import { StatusTemplate, Task } from '../../../../types/dev-tasks.type';

@Component({
  selector: 'app-pending-dev-tracker',
  standalone: true,
  imports: [
    BrnDialogTriggerDirective,
    BrnDialogContentDirective,

    HlmIconComponent,
    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogHeaderComponent,
    HlmDialogFooterComponent,
    HlmDialogTitleDirective,
    HlmDialogDescriptionDirective,
    NgClass,

    HlmLabelDirective,
    HlmInputDirective,
    HlmButtonDirective,
    HlmTableComponent, HlmTrowComponent, HlmThComponent, HlmTdComponent, HlmCaptionComponent,
    MatTooltipModule
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
  templateUrl: './pending-dev-tracker.component.html',
  styleUrl: './pending-dev-tracker.component.scss'
})
export class PendingDevTrackerComponent {

  statusTemplates = statusTemplates;
  protected _tasks: Task[] = [
    { task: "Optimize the dsa-server.service and routing-service", status: 'DONE' },
    { task: "Plan for an unique 'theme' setup with dark mode configurable option", status: 'TODO' },
    { task: "Modify 'header' to look good", status: 'TODO' },
    { task: "Optimize chart-component to use only atmost 1 or 2 signal inputs", status: 'TODO' },
    { task: "Use rxjs combinational operators to simply async operations b/w routes & server-data", status: 'PENDING' },
    { task: "Consider all edge cases for backend, hanlde exceptions", status: 'TODO' },
    { task: "Use types, avoid any - everywhere", status: 'TODO' },
    { task: "Bring plugins for code-lint and code-formatting", status: 'TODO' },
    { task: "Make the charts functional", status: 'TODO' },
    { task: "Format the server data - more accesible", status: 'TODO' },
  ];

  _tasksUpdated = this._tasks.map(task => ({task, statusTemplate: this.statusTemplates[task.status]} as {task:Task, statusTemplate: StatusTemplate}))

}
