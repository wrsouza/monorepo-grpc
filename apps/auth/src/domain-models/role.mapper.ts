import { IMapper } from '@app/common/domain-models';
import { IRole } from '@app/common/database/schemas';
import { Role } from './role';
import { RoleId } from './role-id';
import { PermissionId } from './permission-id';
import { Permission } from './permission';

export class RoleMapper implements IMapper<Role, IRole> {
  toPersistence(entity: Role): IRole {
    return {
      id: entity.id.value,
      name: entity.name,
      description: entity.description,
      permissions: entity.permissions.map((permission) => ({
        id: permission.id.value,
        name: permission.name,
        description: permission.description,
      })),
    };
  }

  toDomain(record: IRole): Role {
    const id = new RoleId(record.id);
    return new Role({
      id,
      name: record.name,
      description: record.description,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      permissions: record.permissions.map(
        (permission) =>
          new Permission({
            id: new PermissionId(permission.id),
            name: permission.name,
            description: permission.description,
            createdAt: permission.createdAt,
            updatedAt: permission.updatedAt,
          }),
      ),
    });
  }
}
