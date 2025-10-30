import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { movieResolver } from './features/movies/resolvers/movie.resolver';
import { movieDetailsResolver } from './features/movies/resolvers/movie-details.resolver';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'movies',
    loadComponent: () =>
      import('./features/movies/movies.component').then(
        (m) => m.MoviesComponent
      ),
    canActivate: [authGuard],
    resolve: { moviesList: movieResolver },
  },
  {
    path: 'movies/movie-details/:movieId',
    loadComponent: () =>
      import('./features/movies/movie-details/movie-details.component').then(
        (m) => m.MovieDetailsComponent
      ),
    canActivate: [authGuard],
    resolve: { movieDetails: movieDetailsResolver },
  },
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'movies',
  },
];
