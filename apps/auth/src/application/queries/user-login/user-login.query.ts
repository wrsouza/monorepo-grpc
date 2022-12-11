import { IQuery } from '@nestjs/cqrs';
import { IUserLoginRequest } from '@app/common/interfaces';

export class UserLoginQuery implements IQuery {
  constructor(readonly login: IUserLoginRequest) {}
}
