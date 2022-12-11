import { IUserDetailsResponse } from '@app/common/interfaces';
import { User } from '../../../domain-models';

export class UserDetailsResponse implements IUserDetailsResponse {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  roles: string[];

  constructor(user: User) {
    this.id = user.id.value;
    this.name = user.name;
    this.email = user.email;
    this.isAdmin = user.isAdmin;
    this.createdAt = user.createdAt.toISOString();
    this.roles = user.roles.map((role) => role.id.value);
  }
}
