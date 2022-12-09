import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcProductsClient } from '@app/common/transports';
import { CATEGORY_PACKAGE_NAME } from '@app/common/interfaces';
import { CategoriesController } from './categories.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: CATEGORY_PACKAGE_NAME,
        ...grpcProductsClient,
      },
    ]),
  ],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
