import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { RootComponent } from './root/root.component';
import { LoginGuard } from './core/login/login.guard.tns';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'sign-up', component: SignupComponent},
  { path: 'main', component: RootComponent, canActivate: [LoginGuard]}
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
