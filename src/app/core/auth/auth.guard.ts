import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();
  if (token) {
    // Token exists, user is authenticated
    return true;
  } else {
    // No token, redirect to login
    router.navigate(['/login']);
    return false;
  }

  // return authService.isAuthenticated().pipe(
  //   take(1),
  //   map((isLoggedIn) => {
  //     if (isLoggedIn) {
  //       return true;
  //     } else {
  //       router.navigate(['/login']);
  //       return false;
  //     }
  //   })
  // );
};
