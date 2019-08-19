import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isAndroid } from 'tns-core-modules/platform';
import * as application from "tns-core-modules/application";
import { AndroidActivityBackPressedEventData, AndroidApplication } from 'tns-core-modules/application';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.stopBackButton();
  }

  private stopBackButton() {
    if (!isAndroid) {
      return;
    }
    application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
      if (this.router.isActive('/login', false)) {
        data.cancel = true; // prevents default back button behavior
      }
    });
  }
}
