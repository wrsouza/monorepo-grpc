import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PermissionCreatedLogEvent } from './permission-created-log.event';

@EventsHandler(PermissionCreatedLogEvent)
export class PermissionCreatedLogHandler
  implements IEventHandler<PermissionCreatedLogEvent>
{
  handle({ permission }: PermissionCreatedLogEvent) {
    Logger.log(`permission ${permission.id.value} was created`);
  }
}
