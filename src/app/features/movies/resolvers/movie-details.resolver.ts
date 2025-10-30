import { ResolveFn } from '@angular/router';
import { MovieDetails } from '../../../shared/interfaces/movie-details';
import { inject } from '@angular/core';
import { MoviesService } from '../services/movies.service';

export const movieDetailsResolver: ResolveFn<MovieDetails> = (route, state) => {
  const movieId = route.paramMap.get('movieId');
  const moviesService = inject(MoviesService);

  return moviesService.getMovieDetails(Number(movieId));
};
