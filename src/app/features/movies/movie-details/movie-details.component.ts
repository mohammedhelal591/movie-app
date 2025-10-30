import { Component, inject } from '@angular/core';
import { MovieDetails } from '../../../shared/interfaces/movie-details';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent {
  movieDetails!: MovieDetails;

  private readonly activatedRoute = inject(ActivatedRoute);
  readonly imgPrefix = environment.imgPrefix;

  constructor() {
    this.activatedRoute.data.subscribe(({ movieDetails }) => {
      this.movieDetails = movieDetails;
    });
  }
}
