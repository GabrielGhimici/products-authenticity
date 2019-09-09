import { Injectable } from '@angular/core';
import { AuthenticationEpic } from '../authentication/store/authentication.epic';
import { UserEpic } from './user/user.epic';
import { ProductEpic } from './product/product.epic';
import { TrackingEpic } from './tracking/tracking.epic';
import { SearchHistoryEpic } from './search-history/search-history.epic';
import { UserManagementEpic } from './user-management/user-management.epic';
import { DataSourceEpic } from './data-source/data-source.epic';
import { DATA_SOURCES } from './data-source/data-source.data';
import { ProductManagementEpic } from './product-management/product-management.epic';

@Injectable()
export class RootEpics {
  constructor(
    private authEpic: AuthenticationEpic,
    private userEpic: UserEpic,
    private productEpic: ProductEpic,
    private trackingEpic: TrackingEpic,
    private searchHistoryEpic: SearchHistoryEpic,
    private userManagementEpic: UserManagementEpic,
    private dataSourceEpic: DataSourceEpic,
    private productManagementEpic: ProductManagementEpic
  ) {}

  public createEpics() {
    return [
      this.authEpic.createEpic(),
      this.userEpic.createEpic(),
      this.productEpic.createEpic(),
      this.trackingEpic.createEpic(),
      this.searchHistoryEpic.createEpic(),
      this.userManagementEpic.createEpic(),
      this.dataSourceEpic.createEpic(DATA_SOURCES.ENTITY),
      this.dataSourceEpic.createEpic(DATA_SOURCES.ROLE),
      this.dataSourceEpic.createEpic(DATA_SOURCES.PRODUCT_TYPE),
      this.productManagementEpic.createEpic()
    ];
  }
}
