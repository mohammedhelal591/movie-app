import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Movie } from '../../../shared/interfaces/movie';
import { MovieDetails } from '../../../shared/interfaces/movie-details';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = environment.tmdbApiKey;
  private imageUrl = 'https://image.tmdb.org/t/p/w500';

  constructor(private http: HttpClient) {}

  getNowPlaying(): Observable<Movie[]> {
    return this.http.get<Movie[]>(
      `${this.apiUrl}/movie/now_playing?api_key=${this.apiKey}`
    );
  }

  getPopular(): Observable<Movie[]> {
    return this.http.get<Movie[]>(
      `${this.apiUrl}/movie/popular?api_key=${this.apiKey}`
    );
  }

  getTopRated(): Observable<Movie[]> {
    return this.http.get<Movie[]>(
      `${this.apiUrl}/movie/top_rated?api_key=${this.apiKey}`
    );
  }

  getUpcoming(): Observable<Movie[]> {
    return this.http.get<Movie[]>(
      `${this.apiUrl}/movie/upcoming?api_key=${this.apiKey}`
    );
  }

  getMovieDetails(movieId: number): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(
      `${this.apiUrl}/movie/${movieId}?api_key=${this.apiKey}`
    );
  }

  getMoviePosterUrl(posterPath: string): string {
    return `${this.imageUrl}${posterPath}`;
  }
}
