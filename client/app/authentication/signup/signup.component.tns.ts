import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page';

@Component({
  selector: 'sign-up',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private page: Page) {}

  ngOnInit() {
    this.page.actionBarHidden = true;
  }
}
