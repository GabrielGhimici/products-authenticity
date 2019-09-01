import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductionStep } from '../../../core/product/production-step';

@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit, OnChanges {

  @Input()
  stepList: Array<ProductionStep> = [];

  public additionalInfo = {};

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    if ('stepList' in changes) {
      changes.stepList.currentValue.forEach((step: ProductionStep) => {
        this.additionalInfo[step.id] = {};
        if (step.status === 'producing') {
          this.additionalInfo[step.id].displayInfo = true;
        } else {
          this.additionalInfo[step.id].displayInfo = false;
        }
      });
    }
  }

  toggleInfo(stepId) {
    this.additionalInfo[stepId].displayInfo = !this.additionalInfo[stepId].displayInfo;
  }
}
