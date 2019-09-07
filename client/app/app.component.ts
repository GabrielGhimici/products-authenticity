import { Component, OnInit } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { UserActions } from './store/user/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private userActions: UserActions
  ) { }

  ngOnInit(): void {
    this.loadUser();
  }

  @dispatch()
  loadUser() {
    return this.userActions.loadUser();
  }
}
