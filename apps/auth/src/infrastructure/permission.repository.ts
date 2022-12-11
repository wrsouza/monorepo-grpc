import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { IPermission, PermissionSchema } from '@app/common/database/schemas';
import { Permission, PermissionMapper } from '../domain-models';

export class PermissionRepository {
  private readonly mapper: PermissionMapper;

  constructor(
    @InjectRepository(PermissionSchema)
    private repository: Repository<IPermission>,
  ) {
    this.mapper = new PermissionMapper();
  }

  async savePermission(entity: Permission): Promise<void> {
    const record = this.mapper.toPersistence(entity);
    await this.repository.save(record);
  }

  async findPermission(
    where: FindOptionsWhere<IPermission>,
  ): Promise<Permission> {
    const record = await this.repository.findOneBy(where);
    if (!record) {
      return null;
    }
    return this.mapper.toDomain(record);
  }
}
