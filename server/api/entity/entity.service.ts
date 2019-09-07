import { Service } from '@tsed/di';
import { AfterRoutesInit } from '@tsed/common';
import { TypeORMService } from '@tsed/typeorm';
import { Connection } from 'typeorm';
import { EntityModel, EntityTypes } from '../../database/entities/entity.model';

@Service()
export class EntityService implements AfterRoutesInit {
  public connection: Connection;
  constructor(
    private typeORMService: TypeORMService
  ) {}

  $afterRoutesInit(): void | Promise<any> {
    this.connection = this.typeORMService.get();
    return null;
  }

  public getSellers(): Promise<Array<EntityModel>> {
    return this.connection.manager.find(EntityModel, {type: EntityTypes.Seller});
  }
}
