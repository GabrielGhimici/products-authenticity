import { Controller, Get, UseBefore } from '@tsed/common';
import { EntityService } from '../entity/entity.service';
import { AuthMiddleware } from '../../middlewares/auth.middleware';

@Controller('/entity')
export class EntityController {
  constructor(
    private entityService: EntityService
  ) {}

  @Get('/sellers')
  @UseBefore(AuthMiddleware)
  getSellers() {
    return this.entityService.getSellers();
  }
}
