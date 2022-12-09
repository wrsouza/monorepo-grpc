import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcAuthClient } from '@app/common/transports';
import { RolesController } from './roles.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_PACKAGE',
        ...grpcAuthClient,
      },
    ]),
  ],
  controllers: [RolesController],
})
export class RolesModule {}
