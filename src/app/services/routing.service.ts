import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivationEnd, NavigationEnd, Router } from '@angular/router';
import { Observable, Subject, filter, map, startWith, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoutingService {
  private router = inject(Router);


  homeRoute$ = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    map(e => e.url.endsWith('home')),
    startWith(false)
  )

  topic$: Observable<string> = this.router.events.pipe(
    filter((event): event is ActivationEnd => event instanceof ActivationEnd),
    map((e) => e.snapshot.params['topic-name']),
    filter((t) => t)
  );

  _topic = toSignal(this.topic$, { initialValue: undefined });
}
