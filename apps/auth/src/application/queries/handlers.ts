import { UserDetailsHandler } from './user-details/user-details.handler';
import { RoleDetailsHandler } from './role-details/role-details.handler';
import { PermissionDetailsHandler } from './permission-details/permission-details.handler';
import { UserLoginHandler } from './user-login/user-login.handler';
import { UserValidateHandler } from './user-validate/user-validate.handler';

export const QueryHandlers = [
  UserDetailsHandler,
  RoleDetailsHandler,
  PermissionDetailsHandler,
  UserLoginHandler,
  UserValidateHandler,
];
