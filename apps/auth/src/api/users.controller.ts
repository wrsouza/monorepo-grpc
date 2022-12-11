import { Controller, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import {
  ICreateUserRequest,
  IUserDetailsRequest,
  USER_SERVICE_NAME,
} from '@app/common/interfaces';
import { Roles } from '@app/common/decorators';
import { GrpcAuthGuard } from '@app/common/guards';
import { CreateUserCommand, CreateUserResponse } from '../application/commands';
import { UserDetailsQuery, UserDetailsResponse } from '../application/queries';

@Controller()
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Roles('create-user', 'admin')
  @UseGuards(GrpcAuthGuard)
  @GrpcMethod(USER_SERVICE_NAME)
  async createUser(request: ICreateUserRequest): Promise<CreateUserResponse> {
    const command = new CreateUserCommand(request);
    return this.commandBus.execute(command);
  }

  @Roles('user-details', 'admin')
  @UseGuards(GrpcAuthGuard)
  @GrpcMethod(USER_SERVICE_NAME)
  async userDetails(
    request: IUserDetailsRequest,
  ): Promise<UserDetailsResponse> {
    const query = new UserDetailsQuery(request.id);
    return this.queryBus.execute(query);
  }
}
