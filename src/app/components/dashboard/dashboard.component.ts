import { Component, computed, inject } from '@angular/core';
import { ProblemContentComponent } from './problem-content/problem-content.component';
import { ProblemsComponent } from './problems/problems.component';

import {
  AsyncPipe,
  JsonPipe,
  KeyValuePipe,
  NgFor,
  NgIf,
} from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  BrnCollapsibleComponent,
  BrnCollapsibleContentComponent,
  BrnCollapsibleTriggerDirective,
} from '@spartan-ng/ui-collapsible-brain';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';
import { DsaServerService } from '../../services/dsa-server.service';
import { RoutingService } from '../../services/routing.service';

export interface TopicRoute {
  path: string;
  title: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLinkActive,
    RouterLink,
    ProblemsComponent,
    ProblemContentComponent,
    BrnCollapsibleComponent,
    BrnCollapsibleTriggerDirective,
    HlmButtonDirective,
    AsyncPipe,
    KeyValuePipe,
    NgIf,
    JsonPipe,
    NgFor,
    BrnCollapsibleContentComponent,
    HlmSpinnerComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private readonly _service = inject(DsaServerService);
  private readonly _router = inject(RoutingService);

  protected readonly _topics = this._service._topics;
  protected readonly _topic = computed(() => {
    console.log(this._topics());
    return this._topics()?.find(
      (t: TopicRoute) => t.path === this._router._topic()
    )?.title;
  });
}