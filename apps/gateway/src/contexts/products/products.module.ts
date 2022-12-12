import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcAuthClient, grpcProductsClient } from '@app/common/transports';
import {
  AUTH_PACKAGE_NAME,
  PRODUCT_PACKAGE_NAME,
} from '@app/common/interfaces';
import { ProductsController } from './products.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_PACKAGE_NAME,
        ...grpcProductsClient,
      },
      {
        name: AUTH_PACKAGE_NAME,
        ...grpcAuthClient,
      },
    ]),
  ],
  controllers: [ProductsController],
})
export class ProductsModule {}
