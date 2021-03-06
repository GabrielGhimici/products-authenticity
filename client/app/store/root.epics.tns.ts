import { Injectable } from '@angular/core';
import { AuthenticationEpic } from '../authentication/store/authentication.epic.tns';
import { UserEpic } from './user/user.epic.tns';
import { ProductEpic } from './product/product.epic.tns';
import { TrackingEpic } from './tracking/tracking.epic.tns';
import { SearchHistoryEpic } from './search-history/search-history.epic.tns';

@Injectable()
export class RootEpics {
  constructor(
    private authEpic: AuthenticationEpic,
    private userEpic: UserEpic,
    private productEpic: ProductEpic,
    private trackingEpic: TrackingEpic,
    private searchHistoryEpic: SearchHistoryEpic
  ) {}

  public createEpics() {
    return [
      this.authEpic.createEpic(),
      this.userEpic.createEpic(),
      this.productEpic.createEpic(),
      this.trackingEpic.createEpic(),
      this.searchHistoryEpic.createEpic()
    ];
  }
}
