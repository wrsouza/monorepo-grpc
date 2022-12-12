import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';

export const CUSTOMER_PACKAGE_NAME = 'customers';
export const CUSTOMER_SERVICE_NAME = 'CustomerService';

export interface ICustomerService {
  createCustomer(
    request: ICreateCustomerRequest,
    metadata?: Metadata,
  ): Observable<ICreateCustomerResponse>;

  customerDetails(
    request: ICustomerDetailsRequest,
    metadata?: Metadata,
  ): Observable<ICustomerDetailsResponse>;
}

export interface ICreateCustomerRequest {
  name: string;
  documentNumber: string;
  address: ICreateCustomerAddressRequest;
}

export interface ICreateCustomerAddressRequest {
  postalCode: string;
  lineAddress: string;
  city: string;
  state: string;
}

export interface ICreateCustomerResponse {
  status?: number;
  error?: string[];
  id: string;
}

export interface ICustomerDetailsRequest {
  id: string;
}

export interface ICustomerDetailsResponse {
  status?: number;
  error?: string[];
  id: string;
  name: string;
  documentNumber: string;
  createdAt: Date;
  address: ICustomerAddressDetailsResponse;
}

export interface ICustomerAddressDetailsResponse {
  postalCode: string;
  lineAddress: string;
  city: string;
  state: string;
}
