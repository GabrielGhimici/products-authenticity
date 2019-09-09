import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import QrScanner from 'qr-scanner';
import { Router } from '@angular/router';

@Component({
  selector: 'search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit, OnDestroy {
  @ViewChild('uploadTrigger',  {static: false}) uploadTrigger: ElementRef;
  public active = false;
  public showMessage = false;
  public showInvalidCodeMessage = false;
  public productCode = '';
  private dragOverListener;
  private dropListener;
  constructor(
    private renderer: Renderer2,
    private router: Router
  ) { }

  ngOnInit() {
    this.dragOverListener = this.renderer.listen(window, 'dragover', this.preventEvent);
    this.dropListener = this.renderer.listen(window, 'drop', this.preventEvent);
  }

  ngOnDestroy(): void {
    this.clearEventListeners();
  }

  private preventEvent(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  private clearEventListeners() {
    // tslint:disable-next-line:no-unused-expression
    this.dragOverListener && typeof this.dragOverListener === 'function' && this.dragOverListener();
    this.dragOverListener = undefined;
    // tslint:disable-next-line:no-unused-expression
    this.dropListener && typeof this.dropListener === 'function' && this.dropListener();
    this.dropListener = undefined;
  }

  upload() {
    this.showInvalidCodeMessage = false;
    this.uploadTrigger.nativeElement.click();
  }

  onDragOver(event: DragEvent) {
    this.preventEvent(event);
    this.active = true;
  }

  onDragLeave() {
    this.active = false;
  }

  onDrop(event: DragEvent) {
    this.active = false;
    this.showMessage = false;
    this.showInvalidCodeMessage = false;
    this.preventEvent(event);
    const files = event.dataTransfer.files;
    if (files.length === 0) {
      return;
    } else {
      const mainFile = files.item(0);
      const validFileType = mainFile.type === 'image/png' || mainFile.name.endsWith('.png');
      if (!validFileType) {
        this.showMessage = true;
        return;
      }
      this.processImage(mainFile);
    }
  }

  onInputChange(event) {
    if (event.target.files) {
      this.processImage(event.target.files.item(0));
    }
  }

  private processImage(file: File) {
    QrScanner.WORKER_PATH = 'assets/js-files/qr-scanner-worker.min.js';
    QrScanner.scanImage(file)
      .then((result) => {
        this.productCode = result;
      })
      .catch((error) => {
        console.error(error);
        this.showInvalidCodeMessage = true;
      });
  }

  gotToProductPage() {
    if (this.productCode) {
      this.router.navigate(['main', 'product-details', this.productCode]);
    }
  }

}
