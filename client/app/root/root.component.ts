import { Component, OnDestroy, OnInit } from '@angular/core';
import { dispatch, select } from '@angular-redux/store';
import { UserActions } from '../store/user/user.actions';
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
  @select(['authenticatedUser', 'loading']) userLoading$: Observable<boolean>;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public user: User;
  public userLoading = true;

  constructor(
    private authenticationActions: AuthenticationActions,
    private userActions: UserActions
  ) { }

  ngOnInit() {
    this.loadUser();
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
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  @dispatch()
  loadUser() {
    return this.userActions.loadUser();
  }

  @dispatch()
  logOutUser() {
    return this.authenticationActions.startLogOut();
  }
}
