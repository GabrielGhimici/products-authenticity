import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { RootComponent } from './root/root.component';
import { LoginGuard } from './core/login/login.guard';
import { SearchProductComponent } from './root/search-product/search-product.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'sign-up', component: SignupComponent},
  { path: 'main', component: RootComponent, canActivate: [LoginGuard], children: [
    {path: 'search-product', component: SearchProductComponent},
    {path: '', redirectTo: 'search-product', pathMatch: 'full'}
  ]},
  { path: '', redirectTo: 'main', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: !environment.production})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
