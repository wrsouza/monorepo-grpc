import { ICommand } from '@nestjs/cqrs';
import { ICreateCustomerRequest } from '@app/common/interfaces';

export class CreateCustomerCommand implements ICommand {
  constructor(readonly createCustomer: ICreateCustomerRequest) {}
}
