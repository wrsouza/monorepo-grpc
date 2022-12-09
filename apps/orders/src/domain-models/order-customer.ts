import { ValueObject } from '@app/common/domain-models';
import { IOrderCustomer } from '@app/common/database/schemas';

export interface ICustomerValues {
  name: string;
  documentNumber: string;
  customerId?: string;
}

export class OrderCustomer extends ValueObject {
  private _name: string;
  private _documentNumber: string;
  private _customerId: string;

  constructor(customer: ICustomerValues) {
    super();
    this._name = customer.name;
    this._documentNumber = customer.documentNumber;
    this._customerId = customer.customerId;
  }

  get name(): string {
    return this._name;
  }

  get documentNumber(): string {
    return this._documentNumber;
  }

  get customerId(): string {
    return this._customerId;
  }

  update(customer: Partial<IOrderCustomer>) {
    if (customer.name) {
      this._name = customer.name;
    }
    if (customer.documentNumber) {
      this._documentNumber = customer.documentNumber;
    }
    if (customer.customerId) {
      this._customerId = customer.customerId;
    }
  }
}
