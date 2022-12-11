import { Controller, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import {
  ICreateRoleRequest,
  IRoleDetailsRequest,
  ROLE_SERVICE_NAME,
} from '@app/common/interfaces';
import { Roles } from '@app/common/decorators';
import { GrpcAuthGuard } from '@app/common/guards';
import { CreateRoleCommand, CreateRoleResponse } from '../application/commands';
import { RoleDetailsQuery, RoleDetailsResponse } from '../application/queries';

@Controller()
export class RolesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Roles('create-role', 'admin')
  @UseGuards(GrpcAuthGuard)
  @GrpcMethod(ROLE_SERVICE_NAME)
  async createRole(request: ICreateRoleRequest): Promise<CreateRoleResponse> {
    const command = new CreateRoleCommand(request);
    return this.commandBus.execute(command);
  }

  @Roles('role-details', 'admin')
  @UseGuards(GrpcAuthGuard)
  @GrpcMethod(ROLE_SERVICE_NAME)
  async roleDetails(
    request: IRoleDetailsRequest,
  ): Promise<RoleDetailsResponse> {
    const query = new RoleDetailsQuery(request.id);
    return this.queryBus.execute(query);
  }
}
