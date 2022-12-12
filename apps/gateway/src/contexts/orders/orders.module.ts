import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcAuthClient, grpcOrdersClient } from '@app/common/transports';
import { AUTH_PACKAGE_NAME, ORDER_PACKAGE_NAME } from '@app/common/interfaces';
import { OrdersController } from './orders.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ORDER_PACKAGE_NAME,
        ...grpcOrdersClient,
      },
      {
        name: AUTH_PACKAGE_NAME,
        ...grpcAuthClient,
      },
    ]),
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
