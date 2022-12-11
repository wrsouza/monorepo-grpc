import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUser, UserSchema } from '@app/common/database/schemas';
import { UserMapper } from '../../../domain-models';
import { UserDetailsQuery } from './user-details.query';
import { UserDetailsResponse } from './user-details.response';

@QueryHandler(UserDetailsQuery)
export class UserDetailsHandler implements IQueryHandler<UserDetailsQuery> {
  private readonly mapper: UserMapper;

  constructor(
    @InjectRepository(UserSchema)
    private repository: Repository<IUser>,
  ) {
    this.mapper = new UserMapper();
  }

  async execute({ id }: UserDetailsQuery): Promise<UserDetailsResponse> {
    const record = await this.repository.findOneBy({ id });
    if (!record) {
      throw new NotFoundException('user not found');
    }
    const user = this.mapper.toDomain(record);
    return new UserDetailsResponse(user);
  }
}
