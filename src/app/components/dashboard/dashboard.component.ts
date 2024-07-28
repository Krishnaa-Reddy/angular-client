import { Component, inject } from '@angular/core';
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
import { ChartComponent } from '../shared/chart/chart.component';
import { IntroMessageComponent } from '../shared/intro-message/intro-message.component';


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
    ChartComponent,
    IntroMessageComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private readonly _service = inject(DsaServerService);

  dataSet = [324, 34, 345];
  total = 150;
  done = 2;
  title = 'Overall Progress';

  protected readonly _topics = this._service._topics;

}