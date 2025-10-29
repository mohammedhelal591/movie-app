import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../../shared/interfaces/movie';
import { SearchPipe } from '../../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { environment } from '../../../../environments/environment';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    SearchPipe,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
})
export class MovieListComponent implements OnInit {
  searchTerm: string = '';

  readonly imgPrefix = environment.imgPrefix;

  @Input() nowPlayingMovies: Movie[] = [];
  @Input() upcomingMovies: Movie[] = [];
  @Input() topRatedMovies: Movie[] = [];
  @Input() popularMovies: Movie[] = [];

  ngOnInit(): void {
    this.nowPlayingMovies = this.nowPlayingMovies.slice(0, 10);
    this.upcomingMovies = this.upcomingMovies.slice(0, 10);
    this.topRatedMovies = this.topRatedMovies.slice(0, 10);
    this.popularMovies = this.popularMovies.slice(0, 10);
  }
}
