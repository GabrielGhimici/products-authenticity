import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { RootComponent } from './root/root.component';
import { LoginGuard } from './core/login/login.guard.tns';
import { SearchProductComponent } from './root/search-product/search-product.component.tns';
import { ProductDetailsComponent } from './root/product-details/product-details.component.tns';
import { SearchHistoryComponent } from './root/search-history/search-history.component.tns';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignupComponent},
  {path: 'main', component: RootComponent, canActivate: [LoginGuard], children: [
    {path: 'search-product', component: SearchProductComponent},
    {path: 'search-history', component: SearchHistoryComponent},
    {path: 'product-details/:identifier', component: ProductDetailsComponent},
    {path: '', redirectTo: 'search-product', pathMatch: 'full'}
  ]},
  {path: '', redirectTo: 'main', pathMatch: 'full'}
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
