import { CreateUserHandler } from './create-user/create-user.handler';
import { CreateRoleHandler } from './create-role/create-role.handler';
import { CreatePermissionHandler } from './create-permission/create-permission.handler';

export const CommandHandlers = [
  CreateUserHandler,
  CreateRoleHandler,
  CreatePermissionHandler,
];
