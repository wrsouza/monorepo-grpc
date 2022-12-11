import { Controller } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import {
  AUTH_SERVICE_NAME,
  IUserValidateRequest,
  IUserLoginRequest,
} from '@app/common/interfaces';
import { UserLoginQuery, UserLoginResponse } from '../application/queries';
import { UserValidateResponse } from '../application/queries/user-validate/user-validate.response';
import { UserValidateQuery } from '../application/queries/user-validate/user-validate.query';

@Controller()
export class AuthController {
  constructor(private readonly queryBus: QueryBus) {}

  @GrpcMethod(AUTH_SERVICE_NAME)
  async userLogin(request: IUserLoginRequest): Promise<UserLoginResponse> {
    const query = new UserLoginQuery(request);
    return this.queryBus.execute(query);
  }

  @GrpcMethod(AUTH_SERVICE_NAME)
  async userValidate(
    request: IUserValidateRequest,
  ): Promise<UserValidateResponse> {
    const query = new UserValidateQuery(request);
    return this.queryBus.execute(query);
  }
}
