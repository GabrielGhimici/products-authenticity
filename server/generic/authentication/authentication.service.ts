import { Service } from '@tsed/di';
import { AfterRoutesInit } from '@tsed/common';
import { TypeORMService } from '@tsed/typeorm';
import { Connection } from 'typeorm';
import * as crypto from 'crypto';
import { User } from '../../database/entities/user.model';

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

  getSalt(length: number = 5) {
    return crypto.randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length)
      .toUpperCase();
  }

  sha512(password, salt) {
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    const value = hash.digest('hex');
    return {
      salt,
      passwordHash: value
    };
  }

  checkUser(email: string, password: string) {
    const userReqs = [
      this.connection.manager.findOne(User, {email}),
      this.connection.getRepository(User)
        .createQueryBuilder('user')
        .select(['user.password', 'user.salt'])
        .where(`email = :email`)
        .setParameters({email})
        .getOne()
    ];
    return Promise.all(userReqs).then(([user, necessaryInfo]) => {
      if (user && necessaryInfo) {
        const hashedPassword = this.sha512(password, necessaryInfo.salt);
        if (hashedPassword.passwordHash === necessaryInfo.password) {
          return user;
        }
      }
      return null;
    });
  }

}
