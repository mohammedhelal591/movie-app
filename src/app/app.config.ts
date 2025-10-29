import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { loaderInterceptor } from './core/interceptors/loader.interceptor';
import { authTokenInterceptor } from './core/interceptors/auth-token.interceptor';
import { AuthService } from './core/auth/auth.service';
import { tap } from 'rxjs/operators'; // Corrected import for tap

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([loaderInterceptor, authTokenInterceptor])),
    provideAnimationsAsync(),
    { // APP_INITIALIZER to load user data before app starts
      provide: APP_INITIALIZER,
      useFactory: (authService: AuthService) => () => authService.initialize().pipe(
        tap(() => console.log('User data loaded via APP_INITIALIZER')) // Optional: log for verification
      ),
      deps: [AuthService],
      multi: true
    }
  ]
};
