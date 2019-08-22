import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page';

@Component({
  selector: 'scan-qr',
  templateUrl: './scan-qr.component.html',
  styleUrls: ['./scan-qr.component.scss']
})
export class ScanQrComponent implements OnInit {

  constructor(
    private page: Page
  ) { }

  ngOnInit() {
    this.page.actionBarHidden = true;
    this.page.className = 'page-style';
  }

}
