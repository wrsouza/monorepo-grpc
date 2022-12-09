import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  OnModuleInit,
  Param,
  Post,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import {
  CreateRoleRequest,
  CreateRoleResponse,
  RoleDetailsRequest,
  RoleDetailsResponse,
} from './dto';
import { RoleService } from './roles.interface';

@ApiBearerAuth()
@ApiTags('Roles')
@Controller('roles')
export class RolesController implements OnModuleInit {
  private roleService: RoleService;

  constructor(@Inject('AUTH_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.roleService = this.client.getService<RoleService>('RoleService');
  }

  @Post()
  createRole(
    @Body() createRoleRequest: CreateRoleRequest,
  ): Observable<CreateRoleResponse> {
    Logger.log(`POST createRole: ${JSON.stringify(createRoleRequest)}`);
    return this.roleService.createRole(createRoleRequest);
  }

  @Get(':id')
  roleDetails(
    @Param() roleDetailsRequest: RoleDetailsRequest,
  ): Observable<RoleDetailsResponse> {
    Logger.log(`GET RoleDetails: ${JSON.stringify(roleDetailsRequest)}`);
    return this.roleService.roleDetails(roleDetailsRequest);
  }
}
