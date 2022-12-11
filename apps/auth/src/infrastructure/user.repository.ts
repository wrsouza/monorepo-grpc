import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { IUser, UserSchema } from '@app/common/database/schemas';
import { User, UserMapper } from '../domain-models';

export class UserRepository {
  private readonly mapper: UserMapper;

  constructor(
    @InjectRepository(UserSchema)
    private repository: Repository<IUser>,
  ) {
    this.mapper = new UserMapper();
  }

  async saveUser(entity: User): Promise<void> {
    const record = this.mapper.toPersistence(entity);
    await this.repository.save(record);
  }

  async findUser(where: FindOptionsWhere<IUser>): Promise<User> {
    const record = await this.repository.findOneBy(where);
    if (!record) {
      return null;
    }
    return this.mapper.toDomain(record);
  }
}
