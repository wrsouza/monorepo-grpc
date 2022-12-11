import { IUserValidateResponse } from '@app/common/interfaces';
import { User } from '../../../domain-models';

export class UserValidateResponse implements IUserValidateResponse {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  roles: string[];

  constructor(user: User) {
    this.id = user.id.value;
    this.name = user.name;
    this.email = user.email;
    this.createdAt = user.createdAt.toISOString();
    this.roles = user.roles.reduce(
      (prev, role) => [
        ...prev,
        ...role.permissions.map((permission) => permission.name),
      ],
      [],
    );
    if (user.isAdmin) {
      this.roles.push('admin');
    }
  }
}
