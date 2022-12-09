import { EntitySchema } from 'typeorm';
import { IOrder } from './order.schema';
import { IProduct } from './product.schema';

export interface IOrderItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  discount: number;
  productId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  product?: IProduct;
  order?: IOrder;
}

export const OrderItemSchema = new EntitySchema<IOrderItem>({
  name: 'order_items',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    name: {
      type: 'varchar',
      length: 200,
    },
    sku: {
      type: 'varchar',
      length: 40,
    },
    quantity: {
      type: 'int',
      default: 1,
    },
    price: {
      type: 'decimal',
      default: 0,
    },
    discount: {
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
    productId: {
      name: 'product_id',
      type: 'uuid',
      nullable: true,
    },
  },
  relations: {
    product: {
      target: 'products',
      type: 'many-to-one',
      joinColumn: {
        name: 'product_id',
        referencedColumnName: 'id',
      },
      onDelete: 'SET NULL',
      inverseSide: 'orderItems',
    },
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
  },
});
