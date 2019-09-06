import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { RootComponent } from './root/root.component';
import { LoginGuard } from './core/login/login.guard';
import { SearchProductComponent } from './root/search-product/search-product.component';
import { ProductDetailsComponent } from './root/product-details/product-details.component';
import { SearchHistoryComponent } from './root/search-history/search-history.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'sign-up', component: SignupComponent},
  { path: 'main', component: RootComponent, canActivate: [LoginGuard], children: [
    {path: 'search-product', component: SearchProductComponent},
    {path: 'search-history', component: SearchHistoryComponent},
    {path: 'product-details/:identifier', component: ProductDetailsComponent},
    {path: '', redirectTo: 'search-product', pathMatch: 'full'}
  ]},
  { path: '', redirectTo: 'main', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
