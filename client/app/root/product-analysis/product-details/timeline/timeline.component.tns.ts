import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductionStep, StepStatus, StepStatusTypes } from '../../../../core/product/production-step';
import * as moment from 'moment';

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
        this.additionalInfo[step.id].displayInfo = step.status === 'producing' || step.status === 'waiting_goods';
      });
      const openedInfo = Object.keys(this.additionalInfo).reduce((acc, key) => {
        return acc || this.additionalInfo[key].displayInfo;
      }, false);
      if (!openedInfo && changes.stepList.currentValue.length) {
        this.additionalInfo[changes.stepList.currentValue[0].id].displayInfo = true;
      }
    }
  }

  formatStepStatus(step: StepStatus) {
    switch (step) {
      case StepStatusTypes.Inactive:
        return 'Inactive';
      case StepStatusTypes.WaitingGoods:
        return 'Waiting goods';
      case StepStatusTypes.Producing:
        return 'Producing';
      case StepStatusTypes.Finished:
        return 'Finished';
      case StepStatusTypes.Deleted:
        return 'Deleted';
      default:
        return step;
    }
  }

  formatDate(date: Date) {
    return moment.utc(date).format('DD MMM YYYY HH:mm:ss');
  }

  toggleInfo(stepId) {
    this.additionalInfo[stepId].displayInfo = !this.additionalInfo[stepId].displayInfo;
  }
}
