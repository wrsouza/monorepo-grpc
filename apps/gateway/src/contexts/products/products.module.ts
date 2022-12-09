import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcProductsClient } from '@app/common/transports';
import { PRODUCT_PACKAGE_NAME } from '@app/common/interfaces';
import { ProductsController } from './products.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_PACKAGE_NAME,
        ...grpcProductsClient,
      },
    ]),
  ],
  controllers: [ProductsController],
})
export class ProductsModule {}
