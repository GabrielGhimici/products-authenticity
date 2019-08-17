import { BodyParams, Controller, Get, Post, QueryParams, Request, Use } from '@tsed/common';
import { UserService } from '../user/user.service';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { User } from '../../database/entities/user.model';
import { QueryParameters } from '../query-params.model';

@Controller('/user')
export class UserController {
  constructor(
    private userService: UserService
  ) {}

  @Get('/profile')
  @Use(AuthMiddleware)
  public getProfile(
    @Request() request,
    @QueryParams() queryParams: QueryParameters
  ): Promise<User> {
    return this.userService.getProfile(request.session.user.id, queryParams);
  }

  @Post('/sign-up')
  public createProfile(
    @BodyParams() user: User
  ): Promise<User> {
    return this.userService.createUser(user);
  }
}
