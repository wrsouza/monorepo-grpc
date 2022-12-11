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
import { JwtAuthGuard } from '../../data/guards/jwt-auth.guard';

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
  @UseGuards(JwtAuthGuard)
  createPermission(
    @Request() { metadata },
    @Body() request: CreatePermissionRequest,
  ): Observable<CreatePermissionResponse> {
    Logger.log(`POST createPermission: ${JSON.stringify(request)}`);
    return this.permissionService.createPermission(request, metadata);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  permissionDetails(
    @Request() { metadata },
    @Param() request: PermissionDetailsRequest,
  ): Observable<PermissionDetailsResponse> {
    Logger.log(`GET permissionDetails: ${JSON.stringify(request)}`);
    return this.permissionService.permissionDetails(request, metadata);
  }
}
