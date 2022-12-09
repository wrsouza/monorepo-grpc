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
  CreatePermissionRequest,
  CreatePermissionResponse,
  PermissionDetailsRequest,
  PermissionDetailsResponse,
} from './dto';
import { PermissionService } from './permissions.interface';

@ApiBearerAuth()
@ApiTags('Permissions')
@Controller('permissions')
export class PermissionsController implements OnModuleInit {
  private permissionService: PermissionService;

  constructor(@Inject('AUTH_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.permissionService =
      this.client.getService<PermissionService>('PermissionService');
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
