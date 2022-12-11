import { ICommand } from '@nestjs/cqrs';
import { ICreateRoleRequest } from '@app/common/interfaces';

export class CreateRoleCommand implements ICommand {
  constructor(readonly createRole: ICreateRoleRequest) {}
}
