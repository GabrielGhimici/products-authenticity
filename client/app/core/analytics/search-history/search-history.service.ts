import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SearchHistoryService {
  constructor(
    private http: HttpClient
  ) { }

  public getSearchHistory(userId: number) {
    return this.http.get(`/api/analytics/${userId}`);
  }
}
