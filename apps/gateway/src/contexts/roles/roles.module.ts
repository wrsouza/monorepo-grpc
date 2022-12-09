import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcAuthClient } from '@app/common/transports';
import { ROLE_PACKAGE_NAME } from '@app/common/interfaces';
import { RolesController } from './roles.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ROLE_PACKAGE_NAME,
        ...grpcAuthClient,
      },
    ]),
  ],
  controllers: [RolesController],
})
export class RolesModule {}
