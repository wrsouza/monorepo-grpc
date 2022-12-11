import { Controller, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import {
  ICreatePermissionRequest,
  IPermissionDetailsRequest,
  PERMISSION_SERVICE_NAME,
} from '@app/common/interfaces';
import { Roles } from '@app/common/decorators';
import { GrpcAuthGuard } from '@app/common/guards';
import {
  CreatePermissionCommand,
  CreatePermissionResponse,
} from '../application/commands';
import {
  PermissionDetailsQuery,
  PermissionDetailsResponse,
} from '../application/queries';

@Controller()
export class PermissionsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Roles('create-permission', 'admin')
  @UseGuards(GrpcAuthGuard)
  @GrpcMethod(PERMISSION_SERVICE_NAME)
  async createPermission(
    request: ICreatePermissionRequest,
  ): Promise<CreatePermissionResponse> {
    const command = new CreatePermissionCommand(request);
    return this.commandBus.execute(command);
  }

  @Roles('permission-details', 'admin')
  @UseGuards(GrpcAuthGuard)
  @GrpcMethod(PERMISSION_SERVICE_NAME)
  async permissionDetails(
    request: IPermissionDetailsRequest,
  ): Promise<PermissionDetailsResponse> {
    const query = new PermissionDetailsQuery(request.id);
    return this.queryBus.execute(query);
  }
}
