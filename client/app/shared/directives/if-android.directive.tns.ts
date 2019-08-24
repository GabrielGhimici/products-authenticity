import { Directive, Inject, TemplateRef, ViewContainerRef } from '@angular/core';
import { DEVICE } from 'nativescript-angular';
import { Device, platformNames } from 'tns-core-modules/platform';

@Directive({
  selector: '[ifAndroid]'
})
export class IfAndroidDirective {

  constructor(
    @Inject(DEVICE) device: Device,
    container: ViewContainerRef,
    // tslint:disable-next-line:ban-types
    templateRef: TemplateRef<Object>
  ) {
    console.log(device.os, platformNames.android);
    if (device.os === platformNames.android) {
      container.createEmbeddedView(templateRef);
    }
  }

}
