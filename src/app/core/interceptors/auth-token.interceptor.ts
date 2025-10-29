import { inject, Injector } from '@angular/core'; // Import Injector
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { catchError, throwError, switchMap } from 'rxjs';
import { Router } from '@angular/router';

let isRefreshing = false;

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const injector = inject(Injector);
  const authService = injector.get(AuthService);
  const router = inject(Router);

  const addToken = (request: HttpRequest<unknown>): HttpRequest<unknown> => {
    const token = authService.getToken();
    if (token) {
      return request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }
    return request;
  };

  return next(addToken(req)).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('/refresh-token')) {
        if (!isRefreshing) {
          isRefreshing = true;
          return authService
            .login({ username: 'refresh', password: 'token' })
            .pipe(
              switchMap((success: boolean) => {
                isRefreshing = false;
                if (success) {
                  return next(addToken(req));
                } else {
                  authService.logout();
                  return throwError(() => error);
                }
              }),
              catchError((refreshError) => {
                isRefreshing = false;
                authService.logout();
                return throwError(() => refreshError);
              })
            );
        } else {
          authService.logout();
          return throwError(() => error);
        }
      }
      return throwError(() => error);
    })
  );
};
