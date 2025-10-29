import { Component, inject } from '@angular/core';
import { MoviesService } from './services/movies.service';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../shared/interfaces/movie';
import { MovieListComponent } from './movie-list/movie-list.component';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [MovieListComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent {
  nowPlaying: Movie[] = [];
  popular: Movie[] = [];
  topRated: Movie[] = [];
  upcoming: Movie[] = [];

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.data.subscribe(({ moviesList }) => {
      this.nowPlaying = moviesList.nowPlaying.results;
      this.popular = moviesList.popular.results;
      this.topRated = moviesList.topRated.results;
      this.upcoming = moviesList.upcoming.results;
    });
  }
}
