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
  IUserService,
  USER_PACKAGE_NAME,
  USER_SERVICE_NAME,
} from '@app/common/interfaces';
import {
  CreateUserRequest,
  CreateUserResponse,
  UserDetailsRequest,
  UserDetailsResponse,
} from './dto';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController implements OnModuleInit {
  private userService: IUserService;

  constructor(@Inject(USER_PACKAGE_NAME) private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<IUserService>(USER_SERVICE_NAME);
  }

  @Post()
  createUser(
    @Body() request: CreateUserRequest,
  ): Observable<CreateUserResponse> {
    Logger.log(`POST createUser: ${JSON.stringify(request)}`);
    return this.userService.createUser(request);
  }

  @Get(':id')
  userDetails(
    @Param() request: UserDetailsRequest,
  ): Observable<UserDetailsResponse> {
    Logger.log(`GET userDetails: ${JSON.stringify(request)}`);
    return this.userService.userDetails(request);
  }
}
