import { EntitySchema, EntitySchemaRelationOptions } from 'typeorm';
import { IRole } from './role.schema';

export interface IPermission {
  id: string;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  roles?: IRole[];
}

export const PermissionSchema = new EntitySchema<IPermission>({
  name: 'permissions',
  columns: {
    id: {
      primary: true,
      generated: 'uuid',
      type: 'uuid',
    },
    name: {
      type: 'varchar',
      length: 50,
    },
    description: {
      type: 'varchar',
      length: 255,
    },
    createdAt: {
      name: 'created_at',
      type: 'timestamptz',
      createDate: true,
    },
    updatedAt: {
      name: 'updated_at',
      type: 'timestamptz',
      updateDate: true,
    },
  },
  relations: {
    roles: {
      target: 'roles',
      type: 'many-to-many',
      cascade: ['insert', 'update'],
      joinTable: {
        name: 'role_permission',
        joinColumn: {
          name: 'permission_id',
          referencedColumnName: 'id',
        },
        inverseJoinColumn: {
          name: 'role_id',
          referencedColumnName: 'id',
        },
      },
      inverseSide: 'permissions',
    } as EntitySchemaRelationOptions,
  },
});
