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
  CreateUserRequest,
  CreateUserResponse,
  UserDetailsRequest,
  UserDetailsResponse,
} from './dto';
import { UserService } from './users.interface';

@ApiBearerAuth()
@ApiTags('Products')
@Controller('products')
export class UsersController implements OnModuleInit {
  private userService: UserService;

  constructor(@Inject('AUTH_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<UserService>('UserService');
  }

  @Post()
  createUser(
    @Body() createUserRequest: CreateUserRequest,
  ): Observable<CreateUserResponse> {
    Logger.log(`POST createUser: ${JSON.stringify(createUserRequest)}`);
    return this.userService.createUser(createUserRequest);
  }

  @Get(':id')
  userDetails(
    @Param() userDetailsRequest: UserDetailsRequest,
  ): Observable<UserDetailsResponse> {
    Logger.log(`GET userDetails: ${JSON.stringify(userDetailsRequest)}`);
    return this.userService.userDetails(userDetailsRequest);
  }
}
