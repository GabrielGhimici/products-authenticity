import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page';
import { Router } from '@angular/router';

@Component({
  selector: 'log-in',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private page: Page,
    private router: Router
  ) {}

  ngOnInit() {
    this.page.actionBarHidden = true;
  }

  goToSignUp() {
    console.log('Redirect');
    this.router.navigate(['/sign-up']);
  }
}
