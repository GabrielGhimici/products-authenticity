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
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './authentication/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './authentication/signup/signup.component';
import { RootComponent } from './root/root.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { SearchProductComponent } from './root/product-analysis/search-product/search-product.component';
import { ProductDetailsComponent } from './root/product-analysis/product-details/product-details.component';
import { TimelineComponent } from './root/product-analysis/product-details/timeline/timeline.component';
import { SearchHistoryComponent } from './root/product-analysis/search-history/search-history.component';
import { ProductListComponent } from './root/product-management/product-list/product-list.component';
import { ManageProductComponent } from './root/product-management/manage-product/manage-product.component';
import { ViewProductComponent } from './root/product-management/view-product/view-product.component';
import { ProductManagementGuard } from './root/product-management/product-management.guard';
import { ManageUsersComponent } from './root/manage-users/manage-users.component';
import { ManageUsersGuard } from './root/manage-users/manage-users.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    RootComponent,
    SearchProductComponent,
    ProductDetailsComponent,
    TimelineComponent,
    SearchHistoryComponent,
    ProductListComponent,
    ManageProductComponent,
    ViewProductComponent,
    ManageUsersComponent
  ],
  imports: [
    NgReduxModule,
    BrowserModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    AppRoutingModule,
  ],
  providers: [
    NgReduxRouter,
    RootEpics,
    ProductManagementGuard,
    ManageUsersGuard
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
