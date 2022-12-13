import { ApiProperty } from '@nestjs/swagger';
import { ShipmentTypeEnum } from '@app/common/database/schemas';
import { Order } from '../../../domain-models/order';

class AddressDetailsReponse {
  postalCode: string;
  lineAddress: string;
  city: string;
  state: string;
}

class CustomerDetailsResponse {
  customerId: string;
  name: string;
  documentNumber: string;
}

export class OrderItemResponse {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  discount: number;
  createdAt?: string;
  productId?: string;
}

export class OrderDetailsResponse {
  id: string;
  subtotal: number;
  shipmentType: ShipmentTypeEnum;
  shipmentValue: number;
  discount: number;
  total: number;
  createdAt: string;
  customer: CustomerDetailsResponse;
  address: AddressDetailsReponse;
  items: OrderItemResponse[];

  constructor(order: Order) {
    this.id = order.id.value;
    this.subtotal = order.subtotal;
    this.shipmentType = order.shipmentType;
    this.shipmentValue = order.shipmentValue;
    this.discount = order.discount;
    this.total = order.total;
    this.createdAt = order.createdAt.toISOString();

    const { customer } = order;
    this.customer = {
      customerId: customer.customerId,
      name: customer.name,
      documentNumber: customer.documentNumber,
    };

    const { address } = order;
    this.address = {
      postalCode: address.postalCode,
      lineAddress: address.lineAddress,
      city: address.city,
      state: address.state,
    };

    this.items = order.items.map((item) => ({
      id: item.id.value,
      name: item.name,
      sku: item.sku,
      quantity: item.quantity,
      price: item.price,
      discount: item.discount,
      createdAt: item.createdAt.toISOString(),
      productId: item.productId,
    }));
  }
}
