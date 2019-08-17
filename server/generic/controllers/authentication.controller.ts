import { BodyParams, Controller, Get, Post, QueryParams, Request, Required, Response, Use } from '@tsed/common';
import { AuthenticationService } from '../authentication/authentication.service';
import { InternalServerError, Unauthorized } from 'ts-httpexceptions';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import * as crypto from 'crypto';
import { QueryParameters } from '../../api/query-params.model';

@Controller('/auth')
export class AuthenticationController {
  constructor(
    public authenticationService: AuthenticationService
  ) {}

  @Get('/token_info')
  getTokenInfo(
    @Request() request,
    @Response() response,
  ) {
    console.log(request.session);
    if (request.headers &&
      request.headers.authorization &&
      request.session &&
      request.session.token &&
      request.session.token === request.headers.authorization) {
      response.status(200).send({valid: true});
    } else {
      response.status(200).send({valid: false});
    }
  }

  @Post('/login')
  public doLogin( @Request() request,
                  @Response() response,
                  @QueryParams() params: QueryParameters,
                  @Required() @BodyParams('email') email: string,
                  @Required() @BodyParams('password') password: string,) {
    return this.authenticationService.checkUser(email, password).then((user) => {
      console.log(params);
      if (user) {
        request.session.user = user;
        request.session.token = crypto.randomBytes(20).toString('hex');
        response.cookie('ProdToken', request.session.token, {
          expires: new Date(Number(new Date())+24*60*60*1000),
          httpOnly: false
        });
        const resp: {OK: boolean, token?: string} = {
          OK: true
        };
        if (params && params.include && params.include === 'token') {
          resp.token = request.session.token;
        }
        return resp;
      } else {
        throw new Unauthorized('Unauthorized');
      }
    });
  }

  @Post('/logout')
  @Use(AuthMiddleware)
  doLogout(
    @Request() request,
    @Response() response,
  ) {
    request.session.destroy((err) => {
      if (err) {
        throw new InternalServerError(err.message, err);
      } else {
        response.status(200);
      }
    });
  }
}
