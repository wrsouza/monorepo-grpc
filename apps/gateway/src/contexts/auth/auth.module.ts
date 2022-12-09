import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME } from '@app/common/interfaces';
import { grpcAuthClient } from '@app/common/transports';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_PACKAGE_NAME,
        ...grpcAuthClient,
      },
    ]),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
