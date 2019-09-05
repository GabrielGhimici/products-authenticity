import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpConfigService } from '../../http-config/http-config.service';

@Injectable()
export class TrackingService {
  constructor(
    private http: HttpClient,
    private httpConfig: HttpConfigService
  ) { }

  public track(userId: number, productId: number) {
    return this.http.post(`${this.httpConfig.getApiConfig()}/api/track/mobile`, {userId, productId});
  }
}
