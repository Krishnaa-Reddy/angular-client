import { Component } from '@angular/core';
import { PendingDevTrackerComponent } from '../../../components/core/pending-dev-tracker/pending-dev-tracker.component';

@Component({
  selector: 'app-intro-message',
  standalone: true,
  imports: [PendingDevTrackerComponent],
  templateUrl: './intro-message.component.html',
  styleUrl: './intro-message.component.scss'
})
export class IntroMessageComponent {

}
