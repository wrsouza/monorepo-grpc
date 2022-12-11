import { IEvent } from '@nestjs/cqrs';
import { Role } from '../../../domain-models/role';

export class RoleCreatedLogEvent implements IEvent {
  constructor(readonly role: Role) {}
}
