import { Component, OnDestroy, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page';
import { Router } from '@angular/router';
import { dispatch, select } from '@angular-redux/store';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AuthenticationActions } from '../store/authentication.actions';

@Component({
  selector: 'log-in',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy{
  @select(['authentication', 'loading']) public authenticationLoading$: Observable<any>;
  @select(['authentication', 'error']) public authenticationError$: Observable<any>;
  @select(['authentication', 'loggedIn']) public loggedIn$: Observable<any>;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public authenticationLoading = false;
  public email = '';
  public password = '';
  constructor(
    private loginActions: AuthenticationActions,
    private page: Page,
    private router: Router
  ) {}

  ngOnInit() {
    this.page.actionBarHidden = true;
    this.authenticationLoading$.pipe(
      takeUntil(this.ngUnsubscribe),
    ).subscribe((loading: boolean) => {
      this.authenticationLoading = loading;
    });
  }

  goToSignUp() {
    console.log('Redirect');
    this.router.navigate(['/sign-up']);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  @dispatch()
  startLogin(formValue: any) {
    return this.loginActions.startLogin(formValue);
  }

  doLogin() {
    const formValue = {
      email: this.email,
      password: this.password
    };
    let formValidity = true;
    if (!formValue.email || !formValue.password) {
      formValidity = false;
    }
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/g;
    if (!emailRegex.test(formValue.email)) {
      alert('Invalid email')
      formValidity = false;
    }
    if (formValidity) {
      this.startLogin(formValue);
      this.loggedIn$
        .pipe(
          filter((data) => !!data)
        ).subscribe((data) => {
        if (data === true) {
          alert('Success')
          this.router.navigate(['/main']);
        }
      });
      this.authenticationError$
        .pipe(
          filter((data) => !!data)
        ).subscribe(() => {
          alert('Unfortunately we could not find your account.');
        });
    }
  }
}
