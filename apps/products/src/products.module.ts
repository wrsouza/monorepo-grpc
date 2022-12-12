import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { CategorySchema, ProductSchema } from '@app/common/database/schemas';
import { DatabaseModule } from '@app/common/database/database.module';
import { CommandHandlers } from './application/commands/handlers';
import { QueryHandlers } from './application/queries/handlers';
import { EventHandlers } from './application/events/handlers';
import { CategoryRepository } from './infrastructure/category.repository';
import { ProductRepository } from './infrastructure/product.repository';
import { ProductsController } from './products.controller';
import { CategoriesController } from './categories.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        CONNECTION_TYPE: Joi.string().required(),
        CONNECTION_STRING: Joi.string().required(),
        JWT_INTERNAL_SECRET: Joi.string().required(),
      }),
      envFilePath: './apps/products/.env',
    }),
    DatabaseModule,
    CqrsModule,
    TypeOrmModule.forFeature([ProductSchema, CategorySchema]),
  ],
  controllers: [ProductsController, CategoriesController],
  providers: [
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    ProductRepository,
    CategoryRepository,
  ],
})
export class ProductsModule {}
