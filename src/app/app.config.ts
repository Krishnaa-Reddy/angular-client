import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ValidTopicGuard } from '../guards/valid-topic.guard';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    ValidTopicGuard,
    provideRouter(routes, withViewTransitions(), withComponentInputBinding()),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideCharts(withDefaultRegisterables())
  ]
};
