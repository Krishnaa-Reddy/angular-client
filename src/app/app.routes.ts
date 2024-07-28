import { Route } from '@angular/router';
import { ValidTopicGuard } from '../guards/valid-topic.guard';
import { ProblemsComponent } from './components/dashboard/problems/problems.component';

// lazy-load standalone components
export const routes: Route[] = [
  {
    path: 'topic',
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./components/dashboard/problems/problems.component').then(
            (mod) => mod.ProblemsComponent
          ),
        canActivate: [ValidTopicGuard]
      },
      {
        path: ':topic-name',
        loadComponent: () =>
          import('./components/dashboard/problems/problems.component').then(
            (mod) => mod.ProblemsComponent
          ),
        canActivate: [ValidTopicGuard]
      },
      {
        path: ':topic-name/problem/:id',
        pathMatch: 'full',
        loadComponent: () =>
          import(
            './components/dashboard/problem-content/problem-content.component'
          ).then((mod) => mod.ProblemContentComponent),
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'topic'
  },
  {
    path: '**',
    redirectTo: 'arrays',
  },
];