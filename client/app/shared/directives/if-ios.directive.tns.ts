import { Directive, Inject, TemplateRef, ViewContainerRef } from '@angular/core';
import { DEVICE } from 'nativescript-angular';
import { Device, platformNames } from 'tns-core-modules/platform';

@Directive({
  selector: '[ifIos]'
})
export class IfIosDirective {

  constructor(
    @Inject(DEVICE) device: Device,
    container: ViewContainerRef,
    // tslint:disable-next-line:ban-types
    templateRef: TemplateRef<Object>
  ) {
    if (device.os === platformNames.ios) {
      container.createEmbeddedView(templateRef);
    }
  }

}
