import { IQuery } from '@nestjs/cqrs';
import { IUserValidateRequest } from '@app/common/interfaces';

export class UserValidateQuery implements IQuery {
  constructor(readonly userValidate: IUserValidateRequest) {}
}
