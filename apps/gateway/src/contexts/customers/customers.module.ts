import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcAuthClient, grpcCustomersClient } from '@app/common/transports';
import {
  AUTH_PACKAGE_NAME,
  CUSTOMER_PACKAGE_NAME,
} from '@app/common/interfaces';
import { CustomersController } from './customers.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: CUSTOMER_PACKAGE_NAME,
        ...grpcCustomersClient,
      },
      {
        name: AUTH_PACKAGE_NAME,
        ...grpcAuthClient,
      },
    ]),
  ],
  controllers: [CustomersController],
})
export class CustomersModule {}
