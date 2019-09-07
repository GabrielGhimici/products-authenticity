import { BodyParams, Controller, Get, PathParams, Post, QueryParams, Request, UseBefore } from '@tsed/common';
import { UserService } from '../user/user.service';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { User } from '../../database/entities/user.model';
import { QueryParameters } from '../query-params.model';
import { Role } from '../../database/entities/role.model';

@Controller('/user')
export class UserController {
  constructor(
    private userService: UserService
  ) {}

  @Get('/profile')
  @UseBefore(AuthMiddleware)
  public getProfile(
    @Request() request,
    @QueryParams() queryParams: QueryParameters
  ): Promise<User> {
    return this.userService.getProfile(request.session.user.id, queryParams);
  }

  @Get('/all')
  @UseBefore(AuthMiddleware)
  public getUsers(
    @Request() request,
    @QueryParams() queryParams: QueryParameters
  ): Promise<Array<User>> {
    return this.userService.getUsers(request.session.user.id, queryParams);
  }

  @Get('/roles')
  @UseBefore(AuthMiddleware)
  public getRoles(): Promise<Array<Role>> {
    return this.userService.getRoles();
  }

  @Get('/:userId/add-to/:entityId')
  @UseBefore(AuthMiddleware)
  public addUserToEntity(
    @PathParams('userId') userId: number,
    @PathParams('entityId') entityId: number
  ): Promise<User> {
    return this.userService.alterParentEntity(userId, entityId);
  }

  @Get('/:userId/switch-role-to/:roleId')
  @UseBefore(AuthMiddleware)
  public switchUserRole(
    @PathParams('userId') userId: number,
    @PathParams('roleId') roleId: number
  ): Promise<User> {
    return this.userService.switchRole(userId, roleId);
  }

  @Get('/:userId/remove-from-entity')
  @UseBefore(AuthMiddleware)
  public removeUserFromEntity(
    @PathParams('userId') userId: number
  ): Promise<User> {
    return this.userService.alterParentEntity(userId, null);
  }

  @Post('/sign-up')
  public createProfile(
    @BodyParams() user: User
  ): Promise<User> {
    return this.userService.createUser(user);
  }
}
