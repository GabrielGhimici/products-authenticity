import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page';
import { BarcodeScanner } from 'nativescript-barcodescanner';
import { Router } from '@angular/router';

@Component({
  selector: 'search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit {
  public identifier = '';
  constructor(
    private page: Page,
    private router: Router,
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
      resultDisplayDuration: 250,
      openSettingsIfPermissionWasPreviouslyDenied: true // ios only
    }).then((result) => {
        this.identifier = result.text;
      }, (errorMessage) => {
        console.log('Error when scanning ' + errorMessage);
      }
    );
  }

  gotToProductPage() {
    console.log(this.identifier);
    if (this.identifier) {
      this.router.navigate(['main', 'product-details', this.identifier]);
    }
  }
}
