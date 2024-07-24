import { Route } from '@angular/router';

// lazy-load standalone component
export const routes: Route[] = [
  {
    path: 'topic',
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./components/dashboard/home/home.component').then(
            (mod) => mod.HomeComponent
          ),
      },
      {
        path: ':topic-name',
        loadComponent: () =>
          import('./components/dashboard/problems/problems.component').then(
            (mod) => mod.ProblemsComponent
          ),
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
    loadComponent: () =>
      import('./components/dashboard/home/home.component').then(
        (mod) => mod.HomeComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'arrays',
  },
];