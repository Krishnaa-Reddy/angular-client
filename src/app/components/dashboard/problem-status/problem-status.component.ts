import { Component, input, signal } from '@angular/core';
import { BrnSelectModule } from '@spartan-ng/ui-select-brain';
import { HlmSelectModule } from '@spartan-ng/ui-select-helm';
import { STATUSES } from '../../../../constants/problems';
import { FormsModule } from '@angular/forms';
import { Problem } from '../../../../types/problem.type';

@Component({
  selector: 'app-problem-status',
  standalone: true,
  imports: [BrnSelectModule, FormsModule, HlmSelectModule],
  templateUrl: './problem-status.component.html',
  styleUrl: './problem-status.component.scss'
})
export class ProblemStatusComponent {

  ///TODO: React to updated status to the specific problem
  status = input<Partial<Problem>>({});
  _status = signal(this.status().status);

  protected readonly statuses = STATUSES;

}
