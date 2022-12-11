import { ICommand } from '@nestjs/cqrs';
import { ICreateUserRequest } from '@app/common/interfaces';

export class CreateUserCommand implements ICommand {
  constructor(readonly createUser: ICreateUserRequest) {}
}
