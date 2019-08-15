import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DevToolsExtension, NgRedux, NgReduxModule } from '@angular-redux/store';
import { AppState } from './store/app-state';
import { NgReduxRouter } from '@angular-redux/router';
import { RootEpics } from './store/root.epics';
import { createEpicMiddleware } from 'redux-observable-es6-compat';
import { rootReducer } from './store/root.reducer';
import { environment } from '../environments/environment';
import { createLogger } from 'redux-logger';
import { provideReduxForms } from '@angular-redux/form';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    MatCheckboxModule,
    NgReduxModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    AppRoutingModule,
  ],
  providers: [
    NgReduxRouter,
    RootEpics
  ],
  bootstrap: [AppComponent]
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
