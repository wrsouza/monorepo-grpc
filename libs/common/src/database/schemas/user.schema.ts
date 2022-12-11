import { EntitySchema, EntitySchemaRelationOptions } from 'typeorm';
import { IRole } from './role.schema';

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  roles?: IRole[];
}

export const UserSchema = new EntitySchema<IUser>({
  name: 'users',
  columns: {
    id: {
      primary: true,
      generated: 'uuid',
      type: 'uuid',
    },
    name: {
      type: 'varchar',
      length: 100,
    },
    email: {
      type: 'varchar',
      length: 255,
    },
    password: {
      type: 'varchar',
      length: 255,
    },
    isAdmin: {
      name: 'is_admin',
      type: 'boolean',
      default: false,
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
      eager: true,
      joinTable: {
        name: 'user_role',
        joinColumn: {
          name: 'user_id',
          referencedColumnName: 'id',
        },
        inverseJoinColumn: {
          name: 'role_id',
          referencedColumnName: 'id',
        },
      },
      inverseSide: 'roles',
    } as EntitySchemaRelationOptions,
  },
});
