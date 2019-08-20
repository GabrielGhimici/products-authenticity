import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit {
  @ViewChild('uploadTrigger',  {static: false}) uploadTrigger: ElementRef;
  public active = false;
  constructor() { }

  ngOnInit() {
    window.addEventListener('drop', (event) => {
      event.preventDefault();
    });
  }

  upload() {
    this.uploadTrigger.nativeElement.click();
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event) {
    event.preventDefault();
    this.active = true;
  }

  @HostListener('dragLeave')
  onDragLeave() {
    this.active = false;
  }

  @HostListener('drop', ['$event'])
  onDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log(event);
    this.active = false;
  }
}
