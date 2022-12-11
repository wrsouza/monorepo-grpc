import { ICommand } from '@nestjs/cqrs';
import { ICreatePermissionRequest } from '@app/common/interfaces';

export class CreatePermissionCommand implements ICommand {
  constructor(readonly createPermission: ICreatePermissionRequest) {}
}
