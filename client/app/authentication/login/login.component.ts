import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthenticationActions } from '../store/authentication.actions';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { dispatch, select } from '@angular-redux/store';
import { filter, takeUntil } from 'rxjs/operators';
import { UserLoginData } from '../store/authentication.data';

@Component({
  selector: 'log-in',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  @select(['authentication', 'loggingIn']) public authenticationLoading$: Observable<any>;
  @select(['authentication', 'error']) public authenticationError$: Observable<any>;
  @select(['authentication', 'loggedIn']) public loggedIn$: Observable<any>;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public authenticationLoading = false;

  constructor( private loginActions: AuthenticationActions,
               private matSnackBar: MatSnackBar,
               private router: Router
  ) { }

  ngOnInit(): void {
    this.authenticationLoading$.pipe(
      takeUntil(this.ngUnsubscribe),
    ).subscribe((loading: boolean) => {
      this.authenticationLoading = loading;
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  @dispatch()
  startLogin(formValue: UserLoginData) {
    return this.loginActions.startLogin(formValue);
  }

  doLogin(formValue: UserLoginData, formValidity: boolean) {
    if (formValidity) {
      this.startLogin(formValue);
      this.loggedIn$
        .pipe(
          filter((data) => !!data)
        ).subscribe((data) => {
        if (data === true) {
          this.router.navigate(['/main']);
        }
      });
      this.authenticationError$
        .pipe(
          filter((data) => !!data)
        ).subscribe(() => {
        this.matSnackBar.open(
          'Incorrect email or password',
          '',
          {
            duration: 2000,
            horizontalPosition: 'right',
          }
        );
      });
    }
  }

}
