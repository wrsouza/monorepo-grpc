import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcAuthClient } from '@app/common/transports';
import { PermissionsController } from './permissions.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_PACKAGE',
        ...grpcAuthClient,
      },
    ]),
  ],
  controllers: [PermissionsController],
})
export class PermissionsModule {}
