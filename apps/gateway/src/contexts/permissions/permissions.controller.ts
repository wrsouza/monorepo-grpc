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
  IPermissionService,
  PERMISSION_PACKAGE_NAME,
  PERMISSION_SERVICE_NAME,
} from '@app/common/interfaces';
import {
  CreatePermissionRequest,
  CreatePermissionResponse,
  PermissionDetailsRequest,
  PermissionDetailsResponse,
} from './dto';

@ApiBearerAuth()
@ApiTags('Permissions')
@Controller('permissions')
export class PermissionsController implements OnModuleInit {
  private permissionService: IPermissionService;

  constructor(
    @Inject(PERMISSION_PACKAGE_NAME) private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.permissionService = this.client.getService<IPermissionService>(
      PERMISSION_SERVICE_NAME,
    );
  }

  @Post()
  createPermission(
    @Body() createPermissionRequest: CreatePermissionRequest,
  ): Observable<CreatePermissionResponse> {
    Logger.log(
      `POST createPermission: ${JSON.stringify(createPermissionRequest)}`,
    );
    return this.permissionService.createPermission(createPermissionRequest);
  }

  @Get(':id')
  permissionDetails(
    @Param() permissionDetailsRequest: PermissionDetailsRequest,
  ): Observable<PermissionDetailsResponse> {
    Logger.log(
      `GET permissionDetails: ${JSON.stringify(permissionDetailsRequest)}`,
    );
    return this.permissionService.permissionDetails(permissionDetailsRequest);
  }
}
