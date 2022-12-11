import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateRoleCommand } from './create-role.command';
import { CreateRoleResponse } from './create-role.response';
import { RoleCreatedLogEvent } from '../../events';
import { Role, Permission, PermissionId, RoleId } from '../../../domain-models';
import { RoleRepository, PermissionRepository } from '../../../infrastructure';

@CommandHandler(CreateRoleCommand)
export class CreateRoleHandler implements ICommandHandler<CreateRoleCommand> {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly permissionRepository: PermissionRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute({ createRole }: CreateRoleCommand): Promise<any> {
    await this.roleExists(createRole.name);
    const permissions = await this.getPermissions(createRole);
    const role = new Role({
      ...createRole,
      id: new RoleId(),
      permissions,
    });
    await this.roleRepository.saveRole(role);

    const event = new RoleCreatedLogEvent(role);
    this.eventBus.publish(event);

    return new CreateRoleResponse(role);
  }

  async getPermissions(createRole): Promise<Permission[]> {
    const permissions: Permission[] = [];
    for (const permissionId of createRole.permissions) {
      const role = await this.findPermission(permissionId);
      permissions.push(
        new Permission({
          id: new PermissionId(),
          name: role.name,
          description: role.description,
          createdAt: role.createdAt,
          updatedAt: role.updatedAt,
        }),
      );
    }
    return permissions;
  }

  async findPermission(id: string): Promise<Permission> {
    const permission = await this.permissionRepository.findPermission({ id });
    if (!permission) {
      throw new NotFoundException(`permission ${id} not found`);
    }
    return permission;
  }

  async roleExists(name: string): Promise<void> {
    const role = await this.roleRepository.findRole({ name });
    if (role) {
      throw new BadRequestException('role already exists.');
    }
  }
}
