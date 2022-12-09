import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcOrdersClient } from '@app/common/transports';
import { ORDER_PACKAGE_NAME } from '@app/common/interfaces';
import { OrdersController } from './orders.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ORDER_PACKAGE_NAME,
        ...grpcOrdersClient,
      },
    ]),
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
