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
    UserActions
  ]
})
export class CoreModule { }
