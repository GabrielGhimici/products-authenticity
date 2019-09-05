import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpConfigService } from '../../http-config/http-config.service';

@Injectable()
export class SearchHistoryService {
  constructor(
    private http: HttpClient,
    private httpConfig: HttpConfigService
  ) { }

  public getSearchHistory(userId: number) {
    return this.http.get(`${this.httpConfig.getApiConfig()}/api/analytics/${userId}`);
  }
}
