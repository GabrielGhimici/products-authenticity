import { Component, OnDestroy, OnInit } from '@angular/core';
import { dispatch, select } from '@angular-redux/store';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { UserSignUpData } from '../store/authentication.data';
import { AuthenticationActions } from '../store/authentication.actions';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'sign-up',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  @select(['authentication', 'signingUp']) public authenticationSigningUp$: Observable<any>;
  @select(['authentication', 'error']) public authenticationError$: Observable<any>;
  @select(['authentication', 'signedUp']) public signedUp$: Observable<any>;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public authenticationSigningUp = false;
  constructor(
    private signUpActions: AuthenticationActions,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.authenticationSigningUp$.pipe(
      takeUntil(this.ngUnsubscribe),
    ).subscribe((loading: boolean) => {
      this.authenticationSigningUp = loading;
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  @dispatch()
  startSignUp(formValue: UserSignUpData) {
    return this.signUpActions.startSignUp(formValue);
  }

  doSignUp(formValue: UserSignUpData, formValidity: boolean) {
    if (formValidity) {
      // tslint:disable-next-line:no-string-literal
      delete formValue['confirmPassword'];
      this.startSignUp(formValue);
      this.signedUp$
        .pipe(
          filter((data) => !!data)
        ).subscribe((data) => {
          console.log(data);
          if (data === true) {
            this.router.navigate(['/login']);
          }
        });
      this.authenticationError$
        .pipe(
          filter((data) => !!data)
        ).subscribe(() => {
          this.matSnackBar.open(
            'Some field data are invalid ',
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
