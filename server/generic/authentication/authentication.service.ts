import { Service } from '@tsed/di';
import { AfterRoutesInit } from '@tsed/common';
import { TypeORMService } from '@tsed/typeorm';
import { Connection } from 'typeorm';

@Service()
export class AuthenticationService implements AfterRoutesInit {
  public connection: Connection;
  constructor(
    private typeORMService: TypeORMService
  ) {}

  $afterRoutesInit(): void | Promise<any> {
    this.connection = this.typeORMService.get();
    return null;
  }
}
