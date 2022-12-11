import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthModule } from './contexts/auth/auth.module';
import { CategoriesModule } from './contexts/categories/categories.module';
import { CustomersModule } from './contexts/customers/customers.module';
import { OrdersModule } from './contexts/orders/orders.module';
import { PermissionsModule } from './contexts/permissions/permissions.module';
import { ProductsModule } from './contexts/products/products.module';
import { RolesModule } from './contexts/roles/roles.module';
import { UsersModule } from './contexts/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        JWT_EXTERNAL_SECRET: Joi.string().required(),
        JWT_INTERNAL_SECRET: Joi.string().required(),
      }),
      envFilePath: './apps/gateway/.env',
    }),
    AuthModule,
    CategoriesModule,
    CustomersModule,
    OrdersModule,
    PermissionsModule,
    ProductsModule,
    RolesModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
