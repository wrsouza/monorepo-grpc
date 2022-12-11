import { Entity } from '@app/common/domain-models/entity';
import { IRole } from '@app/common/database/schemas';
import { RoleId } from './role-id';
import { Permission } from './permission';

export interface IRoleValues {
  id?: RoleId;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  permissions: Permission[];
}

export class Role extends Entity<RoleId> {
  private _name: string;
  private _description: string;
  private _permissions: Permission[];

  constructor(role: IRoleValues) {
    super();
    this._id = role.id;
    this._name = role.name;
    this._description = role.description;
    this._createdAt = role.createdAt;
    this._updatedAt = role.updatedAt;
    this._permissions = role.permissions;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get permissions(): Permission[] {
    return this._permissions;
  }

  update(role: Partial<IRole>) {
    if (role.name) {
      this._name = role.name;
    }
    if (role.description) {
      this._description = role.description;
    }
  }
}
