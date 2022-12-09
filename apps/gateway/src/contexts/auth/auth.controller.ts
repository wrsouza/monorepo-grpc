import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Post,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import {
  AUTH_PACKAGE_NAME,
  AUTH_SERVICE_NAME,
  IAuthService,
} from '../../../../../libs/common/src/interfaces';
import { LoginRequest } from './dto/login.request';
import { LoginResponse } from './dto/login.response';
import { ValidateRequest } from './dto/validate.request';
import { ValidateResponse } from './dto/validate.response';

@ApiTags('Auth')
@Controller('auth')
export class AuthController implements OnModuleInit {
  private authService: IAuthService;

  constructor(@Inject(AUTH_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.authService = this.client.getService<IAuthService>(AUTH_SERVICE_NAME);
  }

  @Post('login')
  login(@Body() request: LoginRequest): Observable<LoginResponse> {
    return this.authService.login(request);
  }

  @Get('validate/:token')
  validate(@Param() request: ValidateRequest): Observable<ValidateResponse> {
    return this.authService.validate(request);
  }
}
