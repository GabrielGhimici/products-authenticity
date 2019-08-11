import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  @select(['router']) router$: Observable<string>;
  public route = 'Default';
  constructor() {}

  ngOnInit() {
    this.router$.subscribe((data) => {
      this.route = data;
    });
  }

}
