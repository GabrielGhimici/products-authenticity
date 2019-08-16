import { Service } from '@tsed/di';
import { TypeORMService } from '@tsed/typeorm';
import { Connection } from 'typeorm';
import { AfterRoutesInit } from '@tsed/common';
import { User } from '../../database/entities/user.model';
import { AuthenticationService } from '../../generic/authentication/authentication.service';
import { Conflict, InternalServerError } from 'ts-httpexceptions';
import { QueryParameters } from '../query-params.model';

@Service()
export class UserService implements AfterRoutesInit {
  private readonly allIncludeValues = ['role', 'parentEntity'];
  public connection: Connection;
  constructor(
    private typeORMService: TypeORMService,
    private authenticationService: AuthenticationService
  ) {}

  $afterRoutesInit(): void | Promise<any> {
    this.connection = this.typeORMService.get();
    return null;
  }

  public getProfile(profileId: number, queryParams: QueryParameters): Promise<User> {
    const includeValue: string = queryParams ? queryParams.include : '';
    const includeList: Array<string> = includeValue ? includeValue.split(',').map(el => el.replace(/\s+/g, '')) : [];
    if (includeList.length !== 0) {
      const relationsArr = this.allIncludeValues.filter(el => includeList.indexOf(el) >= 0);
      return this.connection.manager.getRepository(User).findOne(profileId, {relations: relationsArr});
    }
    return this.connection.manager.findOne(User, {id: profileId});
  }

  public createUser(user: User): Promise<User> {
    const saltedPassword = this.authenticationService.sha512(user.password, this.authenticationService.getSalt());
    user.password = saltedPassword.passwordHash;
    user.salt = saltedPassword.salt;
    user.roleId = 1;
    user.blockChainAccount = '';
    return this.connection.manager.save(user).then((createdUser: User) => {
      delete createdUser.password;
      delete createdUser.salt;
      return createdUser;
    }).catch(err => {
      console.log(err);
      if (err.code === 'ER_DUP_ENTRY') {
        throw new Conflict(err.message);
      }
      throw new InternalServerError(err.message);
    });
  }
}
