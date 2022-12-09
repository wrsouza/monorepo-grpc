import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from '@app/common/database/schemas';
import { CommandHandlers } from './application/commands/handlers';
import { EventHandlers } from './application/events/handlers';
import { QueryHandlers } from './application/queries/handlers';
import { UserRepository } from './infrastructure/user.repository';
import { UsersController } from './users.controller';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([UserSchema])],
  controllers: [UsersController],
  providers: [
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    UserRepository,
  ],
})
export class AuthModule {}
