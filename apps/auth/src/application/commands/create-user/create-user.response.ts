import { ICreateUserResponse } from '@app/common/interfaces';
import { User } from '../../../domain-models/user';

export class CreateUserResponse implements ICreateUserResponse {
  id: string;

  constructor(user: User) {
    this.id = user.id.value;
  }
}
