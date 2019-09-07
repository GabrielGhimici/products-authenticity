import { Component, OnDestroy, OnInit } from '@angular/core';
import { dispatch, select } from '@angular-redux/store';
import { Observable, Subject } from 'rxjs';
import { User } from '../core/user/user';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationActions } from '../authentication/store/authentication.actions';

@Component({
  selector: 'root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit, OnDestroy {
  @select(['authenticatedUser', 'user']) user$: Observable<User>;
  @select(['router']) readonly router$: Observable<any>;
  @select(['authenticatedUser', 'loading']) userLoading$: Observable<boolean>;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public user: User;
  public userLoading = true;
  public manageProductActive: boolean;

  constructor(
    private authenticationActions: AuthenticationActions
  ) { }

  ngOnInit() {
    this.user$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((user: User) => {
      this.user = user;
    });
    this.userLoading$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((loading: boolean) => {
      this.userLoading = loading;
    });
    this.router$
      .pipe(
        takeUntil(this.ngUnsubscribe)
      ).subscribe( routerLink => {
      this.manageProductActive = routerLink.startsWith('/main/product-list') ||
        routerLink.startsWith('/main/view-product') ||
        routerLink.startsWith('/main/manage-product') ||
        routerLink.startsWith('/main/add-product');
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  @dispatch()
  logOutUser() {
    return this.authenticationActions.startLogOut();
  }
}
