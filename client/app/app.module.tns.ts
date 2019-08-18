import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { AppComponent } from './app.component';
import { DevToolsExtension, NgRedux, NgReduxModule } from '@angular-redux/store';
import { AppState } from './store/app-state';
import { NgReduxRouter } from '@angular-redux/router';
import { RootEpics } from './store/root.epics.tns';
import { createEpicMiddleware } from 'redux-observable-es6-compat';
import { rootReducer } from './store/root.reducer';
import { environment } from '../environments/environment';
import { provideReduxForms } from '@angular-redux/form';
import { createLogger } from 'redux-logger';
import { LoginComponent } from './authentication/login/login.component';
import { AppRoutingModule } from './app-routing.module.tns';
import { NativeScriptFormsModule } from 'nativescript-angular';
import { SignupComponent } from './authentication/signup/signup.component';
import { AuthenticationEpic } from './authentication/store/authentication.epic.tns';
import { RootComponent } from './root/root.component';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { AuthenticationActions } from './authentication/store/authentication.actions';
import { LoginGuard } from './core/login/login.guard.tns';
import { HttpConfigService } from './core/http-config/http-config.service';
import { LoginServiceCommon } from './core/login/service/login.service.common';
import { LoginService } from './core/login/service/login.service.tns';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';
import { UserActions } from './store/user/user.actions';
import { UserService } from './core/user/service/user.service.tns';
import { UserEpic } from './store/user/user.epic.tns';
import { IfAndroidDirective } from './shared/directives/if-android.directive';
import { IfIosDirective } from './shared/directives/if-ios.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    RootComponent,
    IfAndroidDirective,
    IfIosDirective
  ],
  imports: [
    NgReduxModule,
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpClientModule,
    NativeScriptUISideDrawerModule,
    AppRoutingModule
  ],
  providers: [
    NgReduxRouter,
    HttpConfigService,
    AuthenticationActions,
    AuthenticationEpic,
    LoginServiceCommon,
    LoginService,
    LoginGuard,
    UserActions,
    UserService,
    UserEpic,
    RootEpics
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})

export class AppModule {
  constructor(
    public store: NgRedux<AppState>,
    devTools: DevToolsExtension,
    ngReduxRouter: NgReduxRouter,
    rootEpics: RootEpics
  ) {
    const middleware = createEpicMiddleware();
    store.configureStore(
      rootReducer,
      {},
      environment.production ? [middleware] : [createLogger(), middleware],
      devTools.isEnabled() ? [devTools.enhancer()] : []
    );
    for(const epic of rootEpics.createEpics()) {
      middleware.run(epic);
    }
    if (ngReduxRouter) {
      ngReduxRouter.initialize();
    }
    provideReduxForms(store);
  }
}
