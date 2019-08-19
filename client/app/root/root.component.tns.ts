import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { dispatch, select } from '@angular-redux/store';
import { Observable, Subject } from 'rxjs';
import { User } from '../core/user/user';
import { AuthenticationActions } from '../authentication/store/authentication.actions';
import { UserActions } from '../store/user/user.actions';
import { takeUntil } from 'rxjs/operators';
import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';

@Component({
  selector: 'root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit, OnDestroy, AfterViewInit {
  @select(['authenticatedUser', 'user']) user$: Observable<User>;
  @select(['authenticatedUser', 'loading']) userLoading$: Observable<boolean>;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public user: User;
  public userLoading = true;
  @ViewChild(RadSideDrawerComponent, { static: false }) public drawerComponent: RadSideDrawerComponent;
  private drawer: RadSideDrawer;
  public showProfile = false;

  constructor(
    private authenticationActions: AuthenticationActions,
    private userActions: UserActions,
    private cdRef: ChangeDetectorRef
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

  ngAfterViewInit(): void {
    this.drawer = this.drawerComponent.sideDrawer;
    this.cdRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  openDrawer() {
    this.drawer.toggleDrawerState();
  }

  toggleProfile() {
    this.showProfile = !this.showProfile;
  }

  onDrawerClosed(event) {
    console.log(event.eventName);
    this.showProfile = false;
  }

  @dispatch()
  loadUser() {
    return this.userActions.loadUser();
  }

  @dispatch()
  logOutUser() {
    console.log('LOG OUT');
    return this.authenticationActions.startLogOut();
  }
}
