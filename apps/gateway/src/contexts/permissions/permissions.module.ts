import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcAuthClient } from '@app/common/transports';
import { PERMISSION_PACKAGE_NAME } from '@app/common/interfaces';
import { PermissionsController } from './permissions.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PERMISSION_PACKAGE_NAME,
        ...grpcAuthClient,
      },
    ]),
  ],
  controllers: [PermissionsController],
})
export class PermissionsModule {}
