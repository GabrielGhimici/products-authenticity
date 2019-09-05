import { Required } from '@tsed/common';

export class TrackingPayload {
  @Required()
  userId: number;

  @Required()
  productId: number;
}

export type TrackingContext = 'web' | 'mobile';
export class TrackingContexts {
  static readonly Web: TrackingContext = 'web';
  static readonly Mobile: TrackingContext = 'mobile';
}
