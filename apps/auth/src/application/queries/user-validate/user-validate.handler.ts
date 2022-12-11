import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUser, UserSchema } from '@app/common/database/schemas';
import { UserMapper } from '../../../domain-models';
import { UserValidateQuery } from './user-validate.query';
import { UserValidateResponse } from './user-validate.response';

@QueryHandler(UserValidateQuery)
export class UserValidateHandler implements IQueryHandler<UserValidateQuery> {
  private readonly userMapper: UserMapper;

  constructor(
    @InjectRepository(UserSchema)
    private repository: Repository<IUser>,
  ) {
    this.userMapper = new UserMapper();
  }

  async execute({
    userValidate,
  }: UserValidateQuery): Promise<UserValidateResponse> {
    const record = await this.repository.findOneBy(userValidate);
    if (!record) {
      throw new NotFoundException('user not found');
    }
    const user = this.userMapper.toDomain(record);
    return new UserValidateResponse(user);
  }
}
