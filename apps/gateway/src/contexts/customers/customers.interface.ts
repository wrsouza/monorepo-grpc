import { Observable } from 'rxjs';
import {
  CreateCustomerRequest,
  CreateCustomerResponse,
  CustomerDetailsRequest,
} from './dto';
import { CustomerDetailsResponse } from './dto/customer-details.response';

export interface CustomerService {
  createCustomer(
    data: CreateCustomerRequest,
  ): Observable<CreateCustomerResponse>;

  customerDetails(
    data: CustomerDetailsRequest,
  ): Observable<CustomerDetailsResponse>;
}
