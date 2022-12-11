import { ICreatePermissionResponse } from '@app/common/interfaces';
import { Permission } from '../../../domain-models';

export class CreatePermissionResponse implements ICreatePermissionResponse {
  id: string;

  constructor(permission: Permission) {
    this.id = permission.id.value;
  }
}
