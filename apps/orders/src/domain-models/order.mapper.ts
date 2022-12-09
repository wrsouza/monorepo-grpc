import { IMapper } from '@app/common/domain-models';
import { IOrder } from '@app/common/database/schemas';
import { Order } from './order';
import { OrderAddress } from './order-address';
import { OrderCustomer } from './order-customer';
import { OrderId } from './order-id';
import { OrderItem } from './order-item';
import { OrderItemId } from './order-item-id';

export class OrderMapper implements IMapper<Order, IOrder> {
  toPersistence(entity: Order): IOrder {
    return {
      id: entity.id.value,
      subtotal: entity.subtotal,
      shipmentType: entity.shipmentType,
      shipmentValue: entity.shipmentValue,
      discount: entity.discount,
      total: entity.total,
      address: {
        postalCode: entity.address.postalCode,
        lineAddress: entity.address.lineAddress,
        city: entity.address.city,
        state: entity.address.state,
      },
      customer: {
        name: entity.customer.name,
        documentNumber: entity.customer.documentNumber,
        customerId: entity.customer.customerId,
      },
      items: entity.items.map((item) => ({
        id: item.id.value,
        name: item.name,
        sku: item.sku,
        quantity: item.quantity,
        price: item.price,
        discount: item.discount,
        productId: item.productId,
      })),
    };
  }

  toDomain(record: IOrder): Order {
    const id = new OrderId(record.id);
    return new Order({
      id,
      subtotal: record.subtotal,
      shipmentType: record.shipmentType,
      shipmentValue: record.shipmentValue,
      discount: record.discount,
      total: record.total,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      address: new OrderAddress({
        postalCode: record.address.postalCode,
        lineAddress: record.address.lineAddress,
        city: record.address.city,
        state: record.address.state,
      }),
      customer: new OrderCustomer({
        name: record.customer.name,
        documentNumber: record.customer.documentNumber,
        customerId: record.customer.customerId,
      }),
      items: record.items.map(
        (item) =>
          new OrderItem({
            id: new OrderItemId(item.id),
            name: item.name,
            sku: item.sku,
            quantity: item.quantity,
            price: item.price,
            discount: item.discount,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            productId: item.productId,
          }),
      ),
    });
  }
}
