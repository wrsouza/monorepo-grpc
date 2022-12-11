import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import {
  AddressSchema,
  CustomerSchema,
  ProductSchema,
  CategorySchema,
  UserSchema,
  RoleSchema,
  PermissionSchema,
  OrderSchema,
  OrderAddressSchema,
  OrderCustomerSchema,
  OrderItemSchema,
} from '../schemas';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  useFactory: (configService: ConfigService) =>
    ({
      type: 'postgres',
      url: configService.get<string>('CONNECTION_STRING'),
      entities: [
        CustomerSchema,
        AddressSchema,
        CategorySchema,
        ProductSchema,
        UserSchema,
        RoleSchema,
        PermissionSchema,
        OrderSchema,
        OrderAddressSchema,
        OrderCustomerSchema,
        OrderItemSchema,
      ],
      synchronize: false,
      logging: true,
      keepConnectionAlive: true,
    } as TypeOrmModuleOptions),
  inject: [ConfigService],
};
