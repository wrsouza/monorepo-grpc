import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcCustomersClient } from '@app/common/transports';
import { CUSTOMER_PACKAGE_NAME } from '@app/common/interfaces';
import { CustomersController } from './customers.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: CUSTOMER_PACKAGE_NAME,
        ...grpcCustomersClient,
      },
    ]),
  ],
  controllers: [CustomersController],
})
export class CustomersModule {}
