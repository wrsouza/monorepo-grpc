import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { DatabaseModule } from '@app/common/database/database.module';
import {
  PermissionSchema,
  RoleSchema,
  UserSchema,
} from '@app/common/database/schemas';
import { CommandHandlers } from './application/commands/handlers';
import { EventHandlers } from './application/events/handlers';
import { QueryHandlers } from './application/queries/handlers';
import {
  UserRepository,
  RoleRepository,
  PermissionRepository,
} from './infrastructure';
import {
  UsersController,
  RolesController,
  PermissionsController,
  AuthController,
} from './api';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        CONNECTION_TYPE: Joi.string().required(),
        CONNECTION_STRING: Joi.string().required(),
        JWT_EXTERNAL_SECRET: Joi.string().required(),
        JWT_INTERNAL_SECRET: Joi.string().required(),
      }),
      envFilePath: './apps/auth/.env',
    }),
    DatabaseModule,
    CqrsModule,
    TypeOrmModule.forFeature([UserSchema, RoleSchema, PermissionSchema]),
  ],
  controllers: [
    UsersController,
    RolesController,
    PermissionsController,
    AuthController,
  ],
  providers: [
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    UserRepository,
    RoleRepository,
    PermissionRepository,
  ],
})
export class AuthModule {}
