import { ApiProperty } from '@nestjs/swagger';
import { ShipmentTypeEnum } from '@app/common/database/schemas';
import {
  IOrderAddressDetailsReponse,
  IOrderCustomerDetailsResponse,
  IOrderDetailsResponse,
  IOrderItemDetailsResponse,
} from '@app/common/interfaces';

class OrderAddressDetailsReponse implements IOrderAddressDetailsReponse {
  @ApiProperty()
  postalCode: string;

  @ApiProperty()
  lineAddress: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;
}

class OrderCustomerDetailsResponse implements IOrderCustomerDetailsResponse {
  @ApiProperty()
  customerId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  documentNumber: string;
}

export class OrderItemDetailsResponse implements IOrderItemDetailsResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  sku: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  discount: number;

  @ApiProperty()
  createdAt?: string;

  @ApiProperty()
  productId?: string;
}

export class OrderDetailsResponse implements IOrderDetailsResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  subtotal: number;

  @ApiProperty()
  shipmentType: ShipmentTypeEnum;

  @ApiProperty()
  shipmentValue: number;

  @ApiProperty()
  discount: number;

  @ApiProperty()
  total: number;

  @ApiProperty()
  createdAt: string;

  @ApiProperty({
    type: OrderCustomerDetailsResponse,
  })
  customer: OrderCustomerDetailsResponse;

  @ApiProperty({
    type: OrderAddressDetailsReponse,
  })
  address: OrderAddressDetailsReponse;

  @ApiProperty({
    type: [OrderItemDetailsResponse],
  })
  items: OrderItemDetailsResponse[];
}
