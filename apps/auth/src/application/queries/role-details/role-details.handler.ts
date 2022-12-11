import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IRole, RoleSchema } from '@app/common/database/schemas';
import { RoleMapper } from '../../../domain-models';
import { RoleDetailsQuery } from './role-details.query';
import { RoleDetailsResponse } from './role-details.response';

@QueryHandler(RoleDetailsQuery)
export class RoleDetailsHandler implements IQueryHandler<RoleDetailsQuery> {
  private readonly mapper: RoleMapper;

  constructor(
    @InjectRepository(RoleSchema)
    private repository: Repository<IRole>,
  ) {
    this.mapper = new RoleMapper();
  }

  async execute({ id }: RoleDetailsQuery): Promise<RoleDetailsResponse> {
    const record = await this.repository.findOneBy({ id });
    if (!record) {
      throw new NotFoundException('role not found');
    }
    const role = this.mapper.toDomain(record);
    return new RoleDetailsResponse(role);
  }
}
