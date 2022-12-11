import { BadRequestException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compareSync } from 'bcrypt';
import { IUser, UserSchema } from '@app/common/database/schemas';
import { UserLoginQuery } from './user-login.query';
import { UserLoginResponse } from './user-login.response';
import { sign } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@QueryHandler(UserLoginQuery)
export class UserLoginHandler implements IQueryHandler<UserLoginQuery> {
  constructor(
    @InjectRepository(UserSchema)
    private repository: Repository<IUser>,
    private configService: ConfigService,
  ) {}

  async execute({ login }: UserLoginQuery): Promise<UserLoginResponse> {
    const record = await this.repository.findOneBy({ email: login.email });
    if (!record) {
      throw new BadRequestException('email or password invalid');
    }
    if (!compareSync(login.password, record.password)) {
      throw new BadRequestException('email or password invalid');
    }
    const payload = { email: record.email, sub: record.id };
    const token = sign(
      payload,
      this.configService.get<string>('JWT_EXTERNAL_SECRET'),
      {
        expiresIn: '1800s',
      },
    );
    return new UserLoginResponse(token);
  }
}
