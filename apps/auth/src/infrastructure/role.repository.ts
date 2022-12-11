import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { IRole, RoleSchema } from '@app/common/database/schemas';
import { Role, RoleMapper } from '../domain-models';

export class RoleRepository {
  private readonly mapper: RoleMapper;

  constructor(
    @InjectRepository(RoleSchema)
    private repository: Repository<IRole>,
  ) {
    this.mapper = new RoleMapper();
  }

  async saveRole(entity: Role): Promise<void> {
    const record = this.mapper.toPersistence(entity);
    await this.repository.save(record);
  }

  async findRole(where: FindOptionsWhere<IRole>): Promise<Role> {
    const record = await this.repository.findOneBy(where);
    if (!record) {
      return null;
    }
    return this.mapper.toDomain(record);
  }
}
