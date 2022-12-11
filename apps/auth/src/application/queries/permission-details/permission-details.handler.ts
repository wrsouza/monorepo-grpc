import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPermission, PermissionSchema } from '@app/common/database/schemas';
import { PermissionMapper } from '../../../domain-models';
import { PermissionDetailsQuery } from './permission-details.query';
import { PermissionDetailsResponse } from './permission-details.response';

@QueryHandler(PermissionDetailsQuery)
export class PermissionDetailsHandler
  implements IQueryHandler<PermissionDetailsQuery>
{
  private readonly mapper: PermissionMapper;

  constructor(
    @InjectRepository(PermissionSchema)
    private repository: Repository<IPermission>,
  ) {
    this.mapper = new PermissionMapper();
  }

  async execute({
    id,
  }: PermissionDetailsQuery): Promise<PermissionDetailsResponse> {
    const record = await this.repository.findOneBy({ id });
    if (!record) {
      throw new NotFoundException('permission not found');
    }
    const permission = this.mapper.toDomain(record);
    return new PermissionDetailsResponse(permission);
  }
}
