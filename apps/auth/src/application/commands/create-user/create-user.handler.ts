import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { CreateUserCommand } from './create-user.command';
import { CreateUserResponse } from './create-user.response';
import { UserCreatedLogEvent } from '../../events';
import { User, UserId, Role, RoleId } from '../../../domain-models';
import { UserRepository, RoleRepository } from '../../../infrastructure';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly userRepository: UserRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute({
    createUser,
  }: CreateUserCommand): Promise<CreateUserResponse> {
    const { email } = createUser;
    await this.userExists(email);
    const encryptedPassword = this.encryptPassword(createUser.password);
    const roles = await this.getRoles(createUser.roles);
    const user = new User({
      ...createUser,
      id: new UserId(),
      password: encryptedPassword,
      roles,
    });
    await this.userRepository.saveUser(user);

    const event = new UserCreatedLogEvent(user);
    this.eventBus.publish(event);

    return new CreateUserResponse(user);
  }

  encryptPassword(password: string): string {
    return hashSync(password, 8);
  }

  async userExists(email: string): Promise<void> {
    const user = await this.userRepository.findUser({ email });
    if (user) {
      throw new BadRequestException('user already exists.');
    }
  }

  async getRoles(roleIds: string[]): Promise<Role[]> {
    const roles: Role[] = [];
    for (const roleId of roleIds) {
      const role = await this.findRole(roleId);
      roles.push(role);
    }
    return roles;
  }

  async findRole(id: string): Promise<Role> {
    const role = await this.roleRepository.findRole({ id });
    if (!role) {
      throw new NotFoundException(`role ${id} not found`);
    }
    return role;
  }
}
