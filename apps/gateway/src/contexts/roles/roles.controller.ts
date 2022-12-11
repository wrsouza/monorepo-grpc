import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  OnModuleInit,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import {
  IRoleService,
  ROLE_PACKAGE_NAME,
  ROLE_SERVICE_NAME,
} from '@app/common/interfaces';
import {
  CreateRoleRequest,
  CreateRoleResponse,
  RoleDetailsRequest,
  RoleDetailsResponse,
} from './dto';
import { JwtAuthGuard } from '../../data/guards/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('Roles')
@Controller('roles')
export class RolesController implements OnModuleInit {
  private roleService: IRoleService;

  constructor(@Inject(ROLE_PACKAGE_NAME) private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.roleService = this.client.getService<IRoleService>(ROLE_SERVICE_NAME);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createRole(
    @Request() { metadata },
    @Body() createRoleRequest: CreateRoleRequest,
  ): Observable<CreateRoleResponse> {
    Logger.log(`POST createRole: ${JSON.stringify(createRoleRequest)}`);
    return this.roleService.createRole(createRoleRequest, metadata);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  roleDetails(
    @Request() { metadata },
    @Param() roleDetailsRequest: RoleDetailsRequest,
  ): Observable<RoleDetailsResponse> {
    Logger.log(`GET RoleDetails: ${JSON.stringify(roleDetailsRequest)}`);
    return this.roleService.roleDetails(roleDetailsRequest, metadata);
  }
}
