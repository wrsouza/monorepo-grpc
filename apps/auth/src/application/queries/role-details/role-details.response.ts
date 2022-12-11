import { IRoleDetailsResponse } from '@app/common/interfaces';
import { Role } from '../../../domain-models';

export class RoleDetailsResponse implements IRoleDetailsResponse {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  permissions: string[];

  constructor(role: Role) {
    this.id = role.id.value;
    this.name = role.name;
    this.description = role.description;
    this.createdAt = role.createdAt.toISOString();
    this.permissions = role.permissions.map(
      (permission) => permission.id.value,
    );
  }
}
