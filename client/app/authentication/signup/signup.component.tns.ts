import { Component, OnDestroy, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page';
import { dispatch, select } from '@angular-redux/store';
import { Observable, Subject } from 'rxjs';
import { AuthenticationActions } from '../store/authentication.actions';
import { Router } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { UserSignUpData } from '../store/authentication.data';

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
  public user: UserSignUpData = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  };

  constructor(
    private page: Page,
    private signUpActions: AuthenticationActions,
    private router: Router
  ) {
  }


  ngOnInit() {
    this.page.actionBarHidden = true;
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

  doSignUp() {
    let formValidity = true;
    const formValue = Object.assign({}, this.user);
    if (!formValue.email || !formValue.password || !formValue.email || !formValue.firstName ||
        !formValue.lastName || !formValue.username || !formValue.confirmPassword) {
      alert('All fields are required');
      formValidity = false;
    } else {
      const emailRegex = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/g;
      if (!emailRegex.test(formValue.email)) {
        alert('Invalid email');
        formValidity = false;
      } else {
        if (formValue.password !== formValue.confirmPassword) {
          alert('Passwords doesn\'t match');
          formValidity = false;
        }
      }
    }

    if (formValidity) {
      this.startSignUp(formValue);
      this.signedUp$
        .pipe(
          filter((data) => !!data)
        ).subscribe((data) => {
        if (data === true) {
          this.router.navigate(['/login']);
        }
      });
      this.authenticationError$
        .pipe(
          filter((data) => !!data)
        ).subscribe(() => {
        alert('Some field data are invalid ');
      });
    }
  }

}
