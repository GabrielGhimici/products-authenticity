import { Controller, Get, PathParams } from '@tsed/common';
import { AnalyticsService } from '../analytics/analytics.service';

@Controller('/analytics')
export class AnalyticsController {
  constructor(
    private analyticsService: AnalyticsService
  ) {}

  @Get('/:userId')
  public getAnalyticsForUser(
    @PathParams('userId') userId: number
  ) {
    return this.analyticsService.getAnalyticsByUser(userId);
  }
}
