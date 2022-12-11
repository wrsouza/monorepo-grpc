import { IMapper } from '@app/common/domain-models';
import { IPermission } from '@app/common/database/schemas';
import { PermissionId } from './permission-id';
import { Permission } from './permission';

export class PermissionMapper implements IMapper<Permission, IPermission> {
  toPersistence(entity: Permission): IPermission {
    return {
      id: entity.id.value,
      name: entity.name,
      description: entity.description,
    };
  }

  toDomain(record: IPermission): Permission {
    return new Permission({
      id: new PermissionId(record.id),
      name: record.name,
      description: record.description,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }
}
