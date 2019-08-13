import { BodyParams, Controller, Post, Request, Required, Response } from '@tsed/common';
import { AuthenticationService } from '../authentication/authentication.service';
import { Unauthorized } from 'ts-httpexceptions';
import * as crypto from 'crypto';

@Controller('/auth')
export class AuthenticationController {
  constructor(
    public authenticationService: AuthenticationService
  ) {}

  @Post('/login')
  public doLogin( @Request() request,
                  @Response() response,
                  @Required() @BodyParams('email') email: string,
                  @Required() @BodyParams('password') password: string,) {
    return this.authenticationService.checkUser(email, password).then((user) => {
      if (user) {
        request.session.user = user;
        request.session.token = crypto.randomBytes(20).toString('hex');
        response.cookie('ProdToken', request.session.token, {
          expires: new Date(Number(new Date())+24*60*60*1000),
          httpOnly: false
        });
        return {
          OK: true
        };
      } else {
        throw new Unauthorized('Unauthorized');
      }
    });
  }
}
