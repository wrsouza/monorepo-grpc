import { EntitySchema } from 'typeorm';
import { IOrder } from './order.schema';

export interface IOrderAddress {
  orderId?: string;
  postalCode: string;
  lineAddress: string;
  city: string;
  state: string;
  order?: IOrder;
}

export const OrderAddressSchema = new EntitySchema<IOrderAddress>({
  name: 'order_address',
  columns: {
    orderId: {
      name: 'order_id',
      type: 'uuid',
      primary: true,
    },
    postalCode: {
      type: 'varchar',
      length: 8,
    },
    lineAddress: {
      type: 'varchar',
      length: 255,
    },
    city: {
      type: 'varchar',
      length: 100,
    },
    state: {
      type: 'varchar',
      length: 2,
    },
  },
  relations: {
    order: {
      target: 'orders',
      type: 'one-to-one',
      joinColumn: {
        name: 'order_id',
        referencedColumnName: 'id',
      },
      onDelete: 'CASCADE',
      inverseSide: 'address',
    },
  },
});
