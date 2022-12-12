import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import {
  AUTH_PACKAGE_NAME,
  AUTH_SERVICE_NAME,
  IAuthService,
} from '@app/common/interfaces';
import { UserLoginRequest, UserLoginResponse } from './dto';
import { JwtAuthGuard } from '../../data/guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController implements OnModuleInit {
  private authService: IAuthService;

  constructor(@Inject(AUTH_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.authService = this.client.getService<IAuthService>(AUTH_SERVICE_NAME);
  }

  @Post('login')
  login(@Body() request: UserLoginRequest): Observable<UserLoginResponse> {
    return this.authService.userLogin(request);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('validate')
  validate(@Request() { user }) {
    const { roles, ...result } = user;
    return result;
  }
}
