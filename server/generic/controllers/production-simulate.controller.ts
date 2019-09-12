import { Controller, Get, PathParams, Request, UseBefore } from '@tsed/common';
import { SimulateProductionService } from '../simulate-production.service';
import { AuthMiddleware } from '../../middlewares/auth.middleware';

@Controller('/sim')
export class ProductionSimulateController {
  constructor(
    private simServ: SimulateProductionService,
  ) {}
  @Get('/:id/ok')
  @UseBefore(AuthMiddleware)
  runOk(
    @Request() req,
    @PathParams('id') id: number
  ) {
    return this.simServ.runOk(req.session.user, id);
  }

  @Get('/:id/fail')
  @UseBefore(AuthMiddleware)
  runFail(
    @Request() req,
    @PathParams('id') id: number
  ) {
    return this.simServ.runFail(req.session.user, id);
  }
}
