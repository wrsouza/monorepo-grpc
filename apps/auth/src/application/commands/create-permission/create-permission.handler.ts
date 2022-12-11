import { BadRequestException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreatePermissionCommand } from './create-permission.command';
import { CreatePermissionResponse } from './create-permission.response';
import { PermissionCreatedLogEvent } from '../../events';
import { Permission, PermissionId } from '../../../domain-models';
import { PermissionRepository } from '../../../infrastructure';

@CommandHandler(CreatePermissionCommand)
export class CreatePermissionHandler
  implements ICommandHandler<CreatePermissionCommand>
{
  constructor(
    private readonly repository: PermissionRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute({ createPermission }: CreatePermissionCommand): Promise<any> {
    await this.permissionExists(createPermission.name);
    const permission = new Permission({
      ...createPermission,
      id: new PermissionId(),
    });
    await this.repository.savePermission(permission);

    const event = new PermissionCreatedLogEvent(permission);
    this.eventBus.publish(event);

    return new CreatePermissionResponse(permission);
  }

  async permissionExists(name: string): Promise<void> {
    const permission = await this.repository.findPermission({ name });
    if (permission) {
      throw new BadRequestException('permission already exists.');
    }
  }
}
