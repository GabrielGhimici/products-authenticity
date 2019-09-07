import { Service } from '@tsed/di';
import { AfterRoutesInit } from '@tsed/common';
import { TypeORMService } from '@tsed/typeorm';
import { Connection } from 'typeorm';
import { TrackingContext, TrackingContexts, TrackingPayload } from './tracking.model';
import { Analytics, Platforms } from '../../database/entities/analytics.model';
import { InternalServerError } from 'ts-httpexceptions';

@Service()
export class TrackingService implements AfterRoutesInit {
  public connection: Connection;

  constructor(
    private typeORMService: TypeORMService
  ) {}

  $afterRoutesInit(): void | Promise<any> {
    this.connection = this.typeORMService.get();
    return null;
  }

  public track(payload: TrackingPayload, context: TrackingContext) {
    const analyticsEntry = new Analytics();
    analyticsEntry.userId = payload.userId;
    analyticsEntry.productId = payload.productId;
    analyticsEntry.date = new Date();
    analyticsEntry.platform = context === TrackingContexts.Mobile ? Platforms.Mobile : Platforms.Web;
    return this.connection.manager.save(analyticsEntry).then((data) => {
      return data;
    }).catch((err) => {
      throw new InternalServerError(err.message);
    });
  }
}
