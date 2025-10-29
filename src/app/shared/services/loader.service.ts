import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private _loading = new BehaviorSubject<boolean>(false);
  private requestCount = 0; // Track active requests

  // Public observable for components to subscribe to, with debounce
  public readonly loading$: Observable<boolean> = this._loading.asObservable().pipe(
    debounceTime(100), // Wait 100ms before emitting true/false
    distinctUntilChanged() // Only emit if the value changes
  );

  constructor() { }

  show(): void {
    this.requestCount++;
    if (this.requestCount === 1) { // Show loader only on the first active request
      this._loading.next(true);
    }
  }

  hide(): void {
    this.requestCount--;
    if (this.requestCount <= 0) { // Hide loader when all requests are finished
      this.requestCount = 0; // Ensure it doesn't go below zero
      this._loading.next(false);
    }
  }
}
