import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivationEnd, Router } from '@angular/router';
import { Observable, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoutingService {
  private router = inject(Router);

  topic$: Observable<string> = this.router.events.pipe(
    filter((event): event is ActivationEnd => event instanceof ActivationEnd),
    map((e) => e.snapshot.params['topic-name']),
    filter((t) => t != undefined)
  );

  _topic = toSignal(this.topic$, { initialValue: undefined });
}
