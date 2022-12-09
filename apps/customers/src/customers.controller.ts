import { Controller, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import { CUSTOMER_SERVICE_NAME } from '@app/common/interfaces';
import {
  CreateCustomerCommand,
  CreateCustomerRequest,
  CreateCustomerResponse,
} from './application/commands';
import {
  CustomerDetailsQuery,
  CustomerDetailsRequest,
  CustomerDetailsResponse,
} from './application/queries';

@Controller()
export class CustomersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @GrpcMethod(CUSTOMER_SERVICE_NAME)
  async createCustomer(
    createCustomerRequest: CreateCustomerRequest,
  ): Promise<CreateCustomerResponse> {
    Logger.log(
      `GRPC createCustomerRequest: ${JSON.stringify(createCustomerRequest)}`,
    );
    const command = new CreateCustomerCommand(createCustomerRequest);
    return this.commandBus.execute(command);
  }

  @GrpcMethod(CUSTOMER_SERVICE_NAME)
  async customerDetails({
    id,
  }: CustomerDetailsRequest): Promise<CustomerDetailsResponse> {
    const query = new CustomerDetailsQuery(id);
    return this.queryBus.execute(query);
  }
}
