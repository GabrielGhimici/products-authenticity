import { Injectable } from '@angular/core';
import { AuthenticationEpic } from '../authentication/store/authentication.epic';
import { UserEpic } from './user/user.epic';
import { ProductEpic } from './product/product.epic';

@Injectable()
export class RootEpics {
  constructor(
    private authEpic: AuthenticationEpic,
    private userEpic: UserEpic,
    private productEpic: ProductEpic
  ) {}

  public createEpics() {
    return [
      this.authEpic.createEpic(),
      this.userEpic.createEpic(),
      this.productEpic.createEpic()
    ];
  }
}
