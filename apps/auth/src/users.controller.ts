import { Body, Controller, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import { USER_SERVICE_NAME } from '@app/common/interfaces';
import {
  CreateUserCommand,
  CreateUserRequest,
  CreateUserResponse,
} from './application/commands';
import {
  UserDetailsQuery,
  UserDetailsRequest,
  UserDetailsResponse,
} from './application/queries';

@Controller()
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @GrpcMethod(USER_SERVICE_NAME)
  async createUser(
    @Body() request: CreateUserRequest,
  ): Promise<CreateUserResponse> {
    const command = new CreateUserCommand(request);
    return this.commandBus.execute(command);
  }

  @GrpcMethod(USER_SERVICE_NAME)
  async userDetails(
    @Param() request: UserDetailsRequest,
  ): Promise<UserDetailsResponse> {
    const query = new UserDetailsQuery(request.id);
    return this.queryBus.execute(query);
  }
}
