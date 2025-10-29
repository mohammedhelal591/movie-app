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
    path: 'movies/upcoming',
    loadComponent: () =>
      import('./features/movies/upcoming/upcoming.component').then(
        (m) => m.UpcomingComponent
      ),
    canActivate: [authGuard],
    resolve: { moviesList: movieResolver },
  },
  {
    path: 'movies/popular',
    loadComponent: () =>
      import('./features/movies/popular/popular.component').then(
        (m) => m.PopularComponent
      ),
    canActivate: [authGuard],
    resolve: { moviesList: movieResolver },
  },
  {
    path: 'movies/top-rated',
    loadComponent: () =>
      import('./features/movies/top-rated/top-rated.component').then(
        (m) => m.TopRatedComponent
      ),
    canActivate: [authGuard],
    resolve: { moviesList: movieResolver },
  },
  {
    path: 'movies/now-playing',
    loadComponent: () =>
      import('./features/movies/now-playing/now-playing.component').then(
        (m) => m.NowPlayingComponent
      ),
    canActivate: [authGuard],
    resolve: { moviesList: movieResolver },
  },
  {
    path: 'movies/movie-details',
    loadComponent: () =>
      import('./features/movies/movie-details/movie-details.component').then(
        (m) => m.MovieDetailsComponent
      ),
    canActivate: [authGuard],
    resolve: { movieDetails: movieDetailsResolver },
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
