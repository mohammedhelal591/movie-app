import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap, finalize, switchMap } from 'rxjs/operators';
import { UserCredentials } from '../../shared/interfaces/user-credentials';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn: Observable<boolean> = this.loggedIn.asObservable();

  private users: UserCredentials[] = [];
  private readonly USERS_JSON_PATH = 'assets/users.json';
  private readonly TOKEN_KEY = 'auth_token';
  private usersLoaded = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    this.checkLoginStatus();
  }

  initialize(): Observable<UserCredentials[]> {
    return this.http.get<UserCredentials[]>(this.USERS_JSON_PATH).pipe(
      tap((users: UserCredentials[]) => {
        this.users = users;
        this.usersLoaded.next(true);
      }),
      finalize(() => {
        if (!this.usersLoaded.value) {
          this.usersLoaded.next(true);
        }
      })
    );
  }

  login(credentials: UserCredentials): Observable<boolean> {
    if (!this.usersLoaded.value) {
      console.warn(
        'Attempting login before users data is loaded. This might indicate an issue with APP_INITIALIZER.'
      );
      return this.initialize().pipe(
        switchMap(() => this.performLogin(credentials))
      );
    }
    return this.performLogin(credentials);
  }

  private performLogin(credentials: UserCredentials): Observable<boolean> {
    const user = this.users.find(
      (u) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );

    if (user) {
      return of(true).pipe(
        delay(500),
        tap(() => {
          localStorage.setItem(this.TOKEN_KEY, 'mock_jwt_token');
          this.loggedIn.next(true);
          this.router.navigate(['/movies']);
        })
      );
    } else {
      return of(false).pipe(delay(500));
    }
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.loggedIn.next(false);
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private checkLoginStatus(): void {
    const token = this.getToken();
    this.loggedIn.next(!!token);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isLoggedIn;
  }
}
