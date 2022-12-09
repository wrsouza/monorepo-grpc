import { EntitySchema } from 'typeorm';
import { ICustomer } from './customer.schema';
import { IOrder } from './order.schema';

export interface IOrderCustomer {
  orderId?: string;
  name: string;
  documentNumber: string;
  customerId?: string;
  order?: IOrder;
  customer?: ICustomer;
}

export const OrderCustomerSchema = new EntitySchema<IOrderCustomer>({
  name: 'order_customers',
  columns: {
    orderId: {
      name: 'order_id',
      type: 'uuid',
      primary: true,
    },
    name: {
      type: 'varchar',
      length: 100,
    },
    documentNumber: {
      name: 'document_number',
      type: 'varchar',
      length: 14,
    },
    customerId: {
      name: 'customer_id',
      type: 'uuid',
      nullable: true,
    },
  },
  relations: {
    order: {
      target: 'orders',
      type: 'many-to-one',
      joinColumn: {
        name: 'order_id',
        referencedColumnName: 'id',
      },
      onDelete: 'CASCADE',
      inverseSide: 'items',
    },
    customer: {
      target: 'customers',
      type: 'many-to-one',
      joinColumn: {
        name: 'customer_id',
        referencedColumnName: 'id',
      },
      onDelete: 'SET NULL',
      inverseSide: 'orderCustomers',
    },
  },
});
