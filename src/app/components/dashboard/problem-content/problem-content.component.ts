import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, ActivationStart, Router, RouterLink } from '@angular/router';
import { BehaviorSubject, filter, tap, map } from 'rxjs';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { lucideChevronRight, lucideChevronLeft, lucideChevronsLeft, lucideChevronsRight } from '@ng-icons/lucide';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card';
import { AngularSplitModule } from 'angular-split';
import {MatChipsModule} from '@angular/material/chips';

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
    MatChipsModule
  ],
  providers: [provideIcons({ lucideChevronsLeft, lucideChevronLeft, lucideChevronRight, lucideChevronsRight })],
  templateUrl: './problem-content.component.html',
  styleUrl: './problem-content.component.scss'
})
export class ProblemContentComponent implements OnInit {


  private route = inject(ActivatedRoute);
  private router = inject(Router);

  problem = new BehaviorSubject<string | null>(null);
  problem$ = this.problem.asObservable();

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event): event is ActivationStart => event instanceof ActivationStart),
      map(e => e.snapshot.params['id']),
      filter(topic => topic && topic != ''),
      tap(topic => this.problem.next(topic))
    ).subscribe();
    this.route.paramMap.subscribe(params => {
      this.problem.next(params.get('id') ?? '');
    });
  }

}