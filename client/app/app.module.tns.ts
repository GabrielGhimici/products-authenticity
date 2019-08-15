import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { AppComponent } from './app.component';
import { DevToolsExtension, NgRedux, NgReduxModule } from '@angular-redux/store';
import { AppState } from './store/app-state';
import { NgReduxRouter } from '@angular-redux/router';
import { RootEpics } from './store/root.epics';
import { createEpicMiddleware } from 'redux-observable-es6-compat';
import { rootReducer } from './store/root.reducer';
import { environment } from '../environments/environment';
import { provideReduxForms } from '@angular-redux/form';
import { createLogger } from 'redux-logger';
import { LoginComponent } from './login/login.component';
import { AppRoutingModuleTns } from './app-routing.module.tns';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    NgReduxModule,
    NativeScriptModule,
    AppRoutingModuleTns
  ],
  providers: [
    NgReduxRouter,
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
