import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TrackingService {
  constructor(
    private http: HttpClient
  ) { }

  public track(userId: number, productId: number) {
    return this.http.post('/api/track/web', {userId, productId});
  }
}
