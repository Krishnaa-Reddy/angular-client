import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, combineLatest, delay, map, of, startWith } from 'rxjs';
import { DSA_DATA } from '../../constants/problems';
import { TopicRoute } from '../components/dashboard/dashboard.component';
import { RoutingService } from './routing.service';
import { DSASheet, ProblemRoute } from '../../types/problem.type';

const apiUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class DsaServerService {
  private _http = inject(HttpClient);
  private _router = inject(RoutingService);

  public readonly _problemRoutes = signal<ProblemRoute[]>([]);
  private readonly _topic = this._router._topic;

  //  1. API response - single source - O
  dsa$ = of(DSA_DATA).pipe(
    catchError((_) => of<DSASheet>({ topics: [], problems: [] })),
    startWith(<DSASheet>{ topics: undefined, problems: undefined })
  );

  //// 7. All problems as observable
  private problems$ = this.dsa$.pipe(map((dsa) => dsa.problems));

  ////3. Bring out all the topics from API response and add corresponding route param. - O
  public topics$ = this.dsa$.pipe(
    map((dsa) => {
      if (dsa.topics) {
        return dsa.topics.map(
          (title) =>
            <TopicRoute>{ title, path: title.replace(' ', '-').toLowerCase() }
        );
      }
      return dsa.topics;
    })
  );

  topic$ = this._router.topic$;

  // 4. Everytime any of the varibales here changes, it gives me latest updated TopicRoute item - uses value at 2. and 3. - O
  combinedLatestTopic$ = combineLatest([this.topics$, this.topic$]);

  topicRoute$ = this.combinedLatestTopic$.pipe(
    map(([topics, topic]) => {
      return topics && topics.find((t) => t.path === topic);
    })
  );

  topicRouteIndex$ = this.combinedLatestTopic$.pipe(
    map(([topics, topic]) => {
      return topics && topics.findIndex((t) => t.path === topic);
    })
  );

  // problemRoutes$ = combineLatest([
  //   this.topicRoute$,
  //   this.topicRouteIndex$,
  // ]).pipe(
  //   switchMap(([topicRoute, topicRouteIndex]) => {
  //     return this.problems$.pipe(
  //       map((problems) => {
  //         return problems.filter((p) =>
  //           p.topics?.includes(topicRoute?.title ?? '')
  //         );
  //       })
  //     );
  //   })
  // );

  ///////Signals

  ///3. Converting value at 2 to signal - S
  _topics = toSignal(this.topics$);

  /// 5. Same as above at 4 & uses value at 3. - S
  _topicRoute = computed(() => {
    return this._topics()?.find(
      (t: TopicRoute) => t.path === this._router._topic()
    )?.title;
  });

  /// 6. all the problems as signal form 1.
  _problems = toSignal(this.problems$);

  /// No need for it at all.
  constructor() {
    // effect(
    //   () => {
    //     const topic = this._topics()?.find(
    //       (t: TopicRoute) => t.path === this._topic()
    //     );
    //     const problems = this._problems()?.filter((p) =>
    //       p.topics?.includes(topic?.title ?? '')
    //     );
    //     const topics = this._topics();
    //     if (topics) {
    //       const problemRoutes: ProblemRoute[] = [];
    //       const topicIndex = topics.findIndex(
    //         (t: TopicRoute) => t.path === this._topic()
    //       );
    //       const prevTopic = topics[topicIndex - 1];
    //       const nextTopic = topics[topicIndex + 1];
    //       const curTopic = topics[topicIndex];
    //       for (let i = 0; i < problems.length; i++) {
    //         const prblm = problems[i];
    //         const prevPrblm = problems[i - 1];
    //         const nxtPrblm = problems[i + 1];
    //         const prevPrblmId = prevPrblm ? prevPrblm.id : prevPrblm;
    //         const nextPrblmId = nxtPrblm ? nxtPrblm.id : nxtPrblm;
    //         const adjRoutes: AdjacentRoutes = {
    //           prevPrblmId,
    //           nextPrblmId,
    //           curTopic: curTopic ? curTopic.path : curTopic,
    //           prevTopic: prevTopic ? prevTopic.path : prevTopic,
    //           nextTopic: nextTopic ? nextTopic.path : nextTopic,
    //         };
    //         problemRoutes.push(<ProblemRoute>{ ...prblm, adjRoutes });
    //       }
    //       this._problemRoutes.set(problemRoutes);
    //     }
    //   },
    //   { allowSignalWrites: true }
    // );
  }
}