import { Injectable } from '@angular/core';
import { AuthenticationEpic } from '../authentication/store/authentication.epic.tns';
import { UserEpic } from './user/user.epic.tns';

@Injectable()
export class RootEpics {
  constructor(
    private authEpic: AuthenticationEpic,
    private userEpic: UserEpic
  ) {}

  public createEpics() {
    return [
      this.authEpic.createEpic(),
      this.userEpic.createEpic()
    ];
  }
}
