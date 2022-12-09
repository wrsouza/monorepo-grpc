import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { OrderSchema } from '@app/common/database/schemas';
import { DatabaseModule } from '@app/common/database/database.module';
import { OrdersController } from './orders.controller';
import { CommandHandlers } from './application/commands/handlers';
import { EventHandlers } from './application/events/handlers';
import { QueryHandlers } from './application/queries/handlers';
import { OrderAddress } from './domain-models/order-address';
import { OrderCustomer } from './domain-models/order-customer';
import { OrderItem } from './domain-models/order-item';
import { OrderService } from './domain-services/order.service';
import { OrderRepository } from './infrastructure/order.repository';
import {
  CUSTOMER_PACKAGE_NAME,
  PRODUCT_PACKAGE_NAME,
} from '@app/common/interfaces';
import {
  grpcCustomersClient,
  grpcProductsClient,
} from '@app/common/transports';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        CONNECTION_TYPE: Joi.string().required(),
        CONNECTION_STRING: Joi.string().required(),
      }),
      envFilePath: './apps/orders/.env',
    }),
    DatabaseModule,
    CqrsModule,
    TypeOrmModule.forFeature([
      OrderSchema,
      OrderCustomer,
      OrderAddress,
      OrderItem,
    ]),
    ClientsModule.register([
      {
        name: CUSTOMER_PACKAGE_NAME,
        ...grpcCustomersClient,
      },
      {
        name: PRODUCT_PACKAGE_NAME,
        ...grpcProductsClient,
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
    OrderRepository,
    OrderService,
  ],
})
export class OrdersModule {}
