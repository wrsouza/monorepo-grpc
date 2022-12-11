import { ICreateRoleResponse } from '@app/common/interfaces';
import { Role } from '../../../domain-models';

export class CreateRoleResponse implements ICreateRoleResponse {
  id: string;

  constructor(role: Role) {
    this.id = role.id.value;
  }
}
