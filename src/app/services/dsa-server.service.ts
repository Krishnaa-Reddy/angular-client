import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { delay, map, of, startWith } from 'rxjs';
import { DSA_DATA, DSASheet } from '../../constants/problems';
import { TopicRoute } from '../components/dashboard/dashboard.component';

@Injectable({
  providedIn: 'root',
})
export class DsaServerService {
  private _http = inject(HttpClient);

  dsa$ = of(DSA_DATA)
    .pipe(delay(3000), startWith(<DSASheet>{ topics: [], problems: [] }));

  private topics$ = this.dsa$.pipe(
    map((dsa) =>
      dsa.topics.map(
        (title: string) =>
          <TopicRoute>{ title, path: title.replace(' ', '-').toLowerCase() }
      )
    )
  );

  _problems = toSignal(this.dsa$.pipe(map((dsa) => dsa.problems)), {
    initialValue: [],
  });
  _topics = toSignal(this.topics$);
}