import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { ErrorInterceptor } from './http-interceptors/http-error.interceptor';
import { HttpXsrfInterceptor } from './http-interceptors/http-xsrf.interceptor';
import { LoginGuard } from './login/login.guard';
import { LoginService } from './login/service/login.service';
import { AuthenticationActions } from '../authentication/store/authentication.actions';
import { AuthenticationEpic } from '../authentication/store/authentication.epic';
import { LoginServiceCommon } from './login/service/login.service.common';
import { UserEpic } from '../store/user/user.epic';
import { UserActions } from '../store/user/user.actions';
import { UserService } from './user/service/user.service';
import { ProductEpic } from '../store/product/product.epic';
import { ProductActions } from '../store/product/product.actions';
import { ProductService } from './product/service/product.service';
import { TrackingService } from './tracking/service/tracking.service';
import { TrackingActions } from '../store/tracking/tracking.actions';
import { TrackingEpic } from '../store/tracking/tracking.epic';
import { SearchHistoryService } from './analytics/search-history/search-history.service';
import { SearchHistoryActions } from '../store/search-history/search-history.actions';
import { SearchHistoryEpic } from '../store/search-history/search-history.epic';
import { UserManagementActions } from '../store/user-management/user-management.actions';
import { UserManagementEpic } from '../store/user-management/user-management.epic';
import { DataSourceService } from './data-source/data-source.service';
import { DataSourceActions } from '../store/data-source/data-source.actions';
import { DataSourceEpic } from '../store/data-source/data-source.epic';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'ProdToken',
      headerName: 'Authorization',
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpXsrfInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    LoginGuard,
    LoginServiceCommon,
    LoginService,
    AuthenticationActions,
    AuthenticationEpic,
    UserService,
    UserEpic,
    UserActions,
    UserManagementActions,
    UserManagementEpic,
    ProductService,
    ProductEpic,
    ProductActions,
    TrackingService,
    TrackingActions,
    TrackingEpic,
    SearchHistoryService,
    SearchHistoryActions,
    SearchHistoryEpic,
    DataSourceService,
    DataSourceActions,
    DataSourceEpic
  ]
})
export class CoreModule { }
