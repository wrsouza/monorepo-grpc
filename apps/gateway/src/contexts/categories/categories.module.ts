import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcAuthClient, grpcProductsClient } from '@app/common/transports';
import {
  AUTH_PACKAGE_NAME,
  CATEGORY_PACKAGE_NAME,
} from '@app/common/interfaces';
import { CategoriesController } from './categories.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: CATEGORY_PACKAGE_NAME,
        ...grpcProductsClient,
      },
      {
        name: AUTH_PACKAGE_NAME,
        ...grpcAuthClient,
      },
    ]),
  ],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
