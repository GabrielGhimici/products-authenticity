import { Injectable } from '@angular/core';
import { AuthenticationEpic } from '../authentication/store/authentication.epic.tns';

@Injectable()
export class RootEpics {
  constructor(
    private authEpic: AuthenticationEpic,
  ) {}

  public createEpics() {
    return [
      this.authEpic.createEpic()
    ];
  }
}
