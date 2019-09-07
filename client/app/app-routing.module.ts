import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { RootComponent } from './root/root.component';
import { LoginGuard } from './core/login/login.guard';
import { SearchProductComponent } from './root/product-analysis/search-product/search-product.component';
import { ProductDetailsComponent } from './root/product-analysis/product-details/product-details.component';
import { SearchHistoryComponent } from './root/product-analysis/search-history/search-history.component';
import { ProductListComponent } from './root/product-management/product-list/product-list.component';
import { ViewProductComponent } from './root/product-management/view-product/view-product.component';
import { ManageProductComponent } from './root/product-management/manage-product/manage-product.component';
import { ProductManagementGuard } from './root/product-management/product-management.guard';
import { ManageUsersComponent } from './root/manage-users/manage-users.component';
import { ManageUsersGuard } from './root/manage-users/manage-users.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignupComponent},
  {path: 'main', component: RootComponent, canActivate: [LoginGuard], children: [
    {path: 'search-product', component: SearchProductComponent},
    {path: 'search-history', component: SearchHistoryComponent},
    {path: 'product-details/:identifier', component: ProductDetailsComponent},
    {path: 'product-list', component: ProductListComponent, canActivate:[ProductManagementGuard]},
    {path: 'view-product/:id', component: ViewProductComponent, canActivate:[ProductManagementGuard]},
    {path: 'manage-product/:id', component: ManageProductComponent, canActivate:[ProductManagementGuard]},
    {path: 'add-product', component: ManageProductComponent, canActivate:[ProductManagementGuard]},
    {path: 'manage-users', component: ManageUsersComponent, canActivate:[ManageUsersGuard]},
    {path: '', redirectTo: 'search-product', pathMatch: 'full'}
  ]},
  {path: '', redirectTo: 'main', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
