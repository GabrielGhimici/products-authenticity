import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page';
import { BarcodeScanner } from 'nativescript-barcodescanner';

@Component({
  selector: 'search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit {
  constructor(
    private page: Page,
    private barcodeScanner: BarcodeScanner
  ) {}

  ngOnInit() {
    this.page.actionBarHidden = true;
    this.page.className = 'page-style';
  }

  public onScan() {
    this.barcodeScanner.scan({
      formats: 'QR_CODE, EAN_13',
      preferFrontCamera: false,
      beepOnScan: true,
      torchOn: false,
      resultDisplayDuration: 500,
      openSettingsIfPermissionWasPreviouslyDenied: true // ios only
    }).then((result) => {
        console.log(result);
      }, (errorMessage) => {
        console.log('Error when scanning ' + errorMessage);
      }
    );
  }

}
