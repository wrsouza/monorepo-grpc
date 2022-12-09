import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { CustomersController } from './customers.controller';
import { AddressSchema } from '@app/common/database/schemas/address.schema';
import { CustomerSchema } from '@app/common/database/schemas/customer.schema';
import { DatabaseModule } from '@app/common/database/database.module';
import { CommandHandlers } from './application/commands/handlers';
import { EventHandlers } from './application/events/handlers';
import { QueryHandlers } from './application/queries/handlers';
import { CustomerRepository } from './infrastructure/customer.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        CONNECTION_TYPE: Joi.string().required(),
        CONNECTION_STRING: Joi.string().required(),
      }),
      envFilePath: './apps/customers/.env',
    }),
    DatabaseModule,
    CqrsModule,
    TypeOrmModule.forFeature([CustomerSchema, AddressSchema]),
  ],
  controllers: [CustomersController],
  providers: [
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    CustomerRepository,
  ],
  exports: [CustomerRepository],
})
export class CustomersModule {}
