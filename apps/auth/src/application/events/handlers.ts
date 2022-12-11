import { UserCreatedLogHandler } from './user-created-log/user-created-log.handler';
import { RoleCreatedLogHandler } from './role-created-log/role-created-log.handler';
import { PermissionCreatedLogHandler } from './permission-created-log/permission-created-log.handler';

export const EventHandlers = [
  UserCreatedLogHandler,
  RoleCreatedLogHandler,
  PermissionCreatedLogHandler,
];
