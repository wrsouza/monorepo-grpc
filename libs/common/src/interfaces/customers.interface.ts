import { Observable } from 'rxjs';

export const CUSTOMER_PACKAGE_NAME = 'customers';
export const CUSTOMER_SERVICE_NAME = 'CustomerService';

export interface ICustomerService {
  createCustomer(
    data: ICreateCustomerRequest,
  ): Observable<ICreateCustomerResponse>;

  customerDetails(
    data: ICustomerDetailsRequest,
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
