import { IMapper } from '@app/common/domain-models';
import { IUser } from '@app/common/database/schemas';
import { User } from './user';
import { UserId } from './user-id';

export class UserMapper implements IMapper<User, IUser> {
  toPersistence(entity: User): IUser {
    return {
      id: entity.id.value,
      name: entity.name,
      email: entity.email,
      password: entity.password,
      isAdmin: entity.isAdmin,
    };
  }

  toDomain(record: IUser): User {
    const id = new UserId(record.id);
    return new User({
      id,
      name: record.name,
      email: record.email,
      password: record.password,
      isAdmin: record.isAdmin,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }
}
