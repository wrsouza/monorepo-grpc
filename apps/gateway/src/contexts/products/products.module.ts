import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcProductsClient } from '@app/common/transports';
import { ProductsController } from './products.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCTS_PACKAGE',
        ...grpcProductsClient,
      },
    ]),
  ],
  controllers: [ProductsController],
})
export class ProductsModule {}
