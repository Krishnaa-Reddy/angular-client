import { Injectable, computed, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of, startWith } from 'rxjs';
import { DSA_DATA } from '../../constants/problems';
import { DSASheet, TopicRoute } from '../../types/problem.type';

@Injectable({
  providedIn: 'root',
})
export class DsaServerService {
  _topic = signal<string | undefined>(undefined);

  private dsa$ = of(DSA_DATA).pipe(
    catchError((_) => of<DSASheet>({ topics: [], problems: [] })),
    startWith(<DSASheet>{ topics: [], problems: [] })
  );

  _problems = toSignal(this.dsa$.pipe(map((dsa) => dsa.problems)));

  _topics = toSignal(
    this.dsa$.pipe(
      map((dsa) => {
        return dsa.topics.map(
          (title) =>
            <TopicRoute>{ title, path: title.replace(' ', '-').toLowerCase() }
        );
      })
    )
  );

  _topicRoute = computed(() =>
    this._topics()?.find((t) => t.path === this._topic())
  );
}
