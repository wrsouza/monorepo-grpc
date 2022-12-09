import { EntitySchema } from 'typeorm';
import { IOrderAddress } from './order-address.schema';
import { IOrderCustomer } from './order-customer.schema';
import { IOrderItem } from './order-item.schema';

export enum ShipmentTypeEnum {
  Slow = 0,
  Fast = 1,
  Free = 2,
}

export interface IOrder {
  id: string;
  subtotal: number;
  shipmentType: ShipmentTypeEnum;
  shipmentValue: number;
  discount: number;
  total: number;
  createdAt?: Date;
  updatedAt?: Date;
  address: IOrderAddress;
  items: IOrderItem[];
  customer: IOrderCustomer;
}

export const OrderSchema = new EntitySchema<IOrder>({
  name: 'orders',
  columns: {
    id: {
      type: 'uuid',
      generated: 'uuid',
      primary: true,
    },
    subtotal: {
      type: 'decimal',
      default: 0,
    },
    shipmentType: {
      type: 'int',
      default: 0,
    },
    shipmentValue: {
      type: 'decimal',
      default: 0,
    },
    discount: {
      type: 'decimal',
      default: 0,
    },
    total: {
      type: 'decimal',
      default: 0,
    },
    createdAt: {
      name: 'created_at',
      type: 'timestamptz',
      createDate: true,
    },
    updatedAt: {
      name: 'updated_at',
      type: 'timestamptz',
      updateDate: true,
    },
  },
  relations: {
    address: {
      target: 'order_address',
      type: 'one-to-one',
      cascade: ['insert', 'update'],
      eager: true,
      inverseSide: 'order',
    },
    customer: {
      target: 'order_customers',
      type: 'one-to-one',
      cascade: ['insert', 'update'],
      eager: true,
      inverseSide: 'order',
    },
    items: {
      target: 'order_items',
      type: 'one-to-many',
      cascade: ['insert', 'update'],
      eager: true,
      inverseSide: 'order',
    },
  },
});
