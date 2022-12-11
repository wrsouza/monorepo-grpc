import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { RoleCreatedLogEvent } from './role-created-log.event';

@EventsHandler(RoleCreatedLogEvent)
export class RoleCreatedLogHandler
  implements IEventHandler<RoleCreatedLogEvent>
{
  handle({ role }: RoleCreatedLogEvent) {
    Logger.log(`Role ${role.id.value} was created`);
  }
}
