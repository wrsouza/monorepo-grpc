import { EntitySchema, EntitySchemaRelationOptions } from 'typeorm';
import { IPermission } from './permission.schema';

export interface IRole {
  id: string;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  permissions?: IPermission[];
}

export const RoleSchema = new EntitySchema<IRole>({
  name: 'roles',
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
    permissions: {
      target: 'permissions',
      type: 'many-to-many',
      cascade: ['insert', 'update'],
      inverseSide: 'roles',
      eager: true,
    } as EntitySchemaRelationOptions,
  },
});
