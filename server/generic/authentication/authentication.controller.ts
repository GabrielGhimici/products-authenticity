import { Controller } from '@tsed/common';
import { AuthenticationService } from './authentication.service';

@Controller('/auth')
export class AuthenticationController {
  constructor(
    public authenticationService: AuthenticationService
  ) {}
}
