import { BodyParams, Controller, Post } from '@tsed/common';
import { TrackingService } from '../tracking/tracking.service';
import { TrackingContexts, TrackingPayload } from '../tracking/tracking.model';

@Controller('/track')
export class TrackingController {
  constructor(private trackingService: TrackingService) {}

  @Post('/web')
  public trackWeb(
    @BodyParams() body: TrackingPayload
  ) {
    return this.trackingService.track(body, TrackingContexts.Web);
  }

  @Post('/mobile')
  public trackMobile(
    @BodyParams() body: TrackingPayload
  ) {
    return this.trackingService.track(body, TrackingContexts.Mobile);
  }
}
