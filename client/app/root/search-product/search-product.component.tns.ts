import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page';
import { Router } from '@angular/router';

@Component({
  selector: 'search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit {
  constructor(
    private page: Page,
    private router: Router
  ) {}

  ngOnInit() {
    this.page.actionBarHidden = true;
    this.page.className = 'page-style';
  }

  switchToScan() {
    this.router.navigate(['/main/scan-qr']);
  }
}
