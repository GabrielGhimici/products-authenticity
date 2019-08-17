import { Injectable } from '@angular/core';
import { AuthenticationEpic } from '../authentication/store/authentication.epic';

@Injectable()
export class RootEpics {
  constructor(
    private authEpic: AuthenticationEpic
  ) {}

  public createEpics() {
    return [
      this.authEpic.createEpic()
    ];
  }
}
