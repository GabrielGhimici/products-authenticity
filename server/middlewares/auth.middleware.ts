import { IMiddleware, Middleware, Next, Request, Response } from '@tsed/common';

@Middleware()
export class AuthMiddleware implements IMiddleware {
  use(
    @Request() request,
    @Response() response,
    @Next() next
  ) {
    const token = request.headers.authorization;
    if (!token || token === 'undefined') {
      response.status(401).send('Unauthorized');
    } else {
      if (request.session.token && (request.session.token === token)) {
        next();
      } else {
        response.status(401).send('Unauthorized');
      }
    }
  }
}
