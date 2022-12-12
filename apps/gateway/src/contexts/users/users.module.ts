import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcAuthClient } from '@app/common/transports';
import { AUTH_PACKAGE_NAME, USER_PACKAGE_NAME } from '@app/common/interfaces';
import { UsersController } from './users.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_PACKAGE_NAME,
        ...grpcAuthClient,
      },
      {
        name: AUTH_PACKAGE_NAME,
        ...grpcAuthClient,
      },
    ]),
  ],
  controllers: [UsersController],
})
export class UsersModule {}
