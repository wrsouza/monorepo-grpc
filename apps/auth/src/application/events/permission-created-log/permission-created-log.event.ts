import { IEvent } from '@nestjs/cqrs';
import { Permission } from '../../../domain-models';

export class PermissionCreatedLogEvent implements IEvent {
  constructor(readonly permission: Permission) {}
}
