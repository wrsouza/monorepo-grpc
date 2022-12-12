import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';
import { ShipmentTypeEnum } from '../database/schemas';

export const ORDER_PACKAGE_NAME = 'orders';
export const ORDER_SERVICE_NAME = 'OrderService';

export interface IOrderService {
  createOrder(
    request: ICreateOrderRequest,
    metadata?: Metadata,
  ): Observable<ICreateOrderResponse>;
  orderDetails(
    request: IOrderDetailsRequest,
    metadata?: Metadata,
  ): Observable<IOrderDetailsResponse>;
}

export interface ICreateOrderRequest {
  customerId: string;
  shipmentType: ShipmentTypeEnum;
  shipmentValue: number;
  items: ICreateOrderItemRequest[];
}

export interface ICreateOrderItemRequest {
  productId: string;
  quantity: number;
  discount: number;
}

export interface ICreateOrderResponse {
  status?: number;
  error?: string[];
  id: string;
}

export interface IOrderDetailsRequest {
  id: string;
}

export interface IOrderDetailsResponse {
  status?: number;
  error?: string[];
  id: string;
  subtotal: number;
  shipmentType: ShipmentTypeEnum;
  shipmentValue: number;
  discount: number;
  total: number;
  createdAt: string;
  customer: IOrderCustomerDetailsResponse;
  address: IOrderAddressDetailsReponse;
  items: IOrderItemDetailsResponse[];
}

export interface IOrderAddressDetailsReponse {
  postalCode: string;
  lineAddress: string;
  city: string;
  state: string;
}

export interface IOrderCustomerDetailsResponse {
  customerId: string;
  name: string;
  documentNumber: string;
}

export interface IOrderItemDetailsResponse {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  discount: number;
  createdAt?: string;
  productId?: string;
}
