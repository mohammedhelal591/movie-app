import { ResolveFn } from '@angular/router';
import { MoviesService } from '../services/movies.service';
import { inject } from '@angular/core';
import { forkJoin } from 'rxjs';
import { MovieData } from '../../../shared/interfaces/movie';

export const movieResolver: ResolveFn<MovieData> = (route, state) => {
  const movieService = inject(MoviesService);

  return forkJoin({
    nowPlaying: movieService.getNowPlaying(),
    popular: movieService.getPopular(),
    topRated: movieService.getTopRated(),
    upcoming: movieService.getUpcoming(),
  });
};
