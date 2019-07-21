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
import { RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    NgReduxModule,
    BrowserModule,
    RouterModule.forRoot([
      {path: '', redirectTo: '/test', pathMatch: 'full'},
      {path: 'test', component: TestComponent}
    ]),
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
