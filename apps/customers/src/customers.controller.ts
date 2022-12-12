import { Controller, Logger, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CUSTOMER_SERVICE_NAME,
  ICreateCustomerRequest,
  ICustomerDetailsRequest,
} from '@app/common/interfaces';
import {
  CreateCustomerCommand,
  CreateCustomerResponse,
} from './application/commands';
import {
  CustomerDetailsQuery,
  CustomerDetailsResponse,
} from './application/queries';
import { GrpcAuthGuard } from '@app/common/guards';
import { Roles } from '@app/common/decorators';

@Controller()
export class CustomersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Roles('create-customer', 'admin')
  @UseGuards(GrpcAuthGuard)
  @GrpcMethod(CUSTOMER_SERVICE_NAME)
  async createCustomer(
    request: ICreateCustomerRequest,
  ): Promise<CreateCustomerResponse> {
    Logger.log(`GRPC createCustomerRequest: ${JSON.stringify(request)}`);
    const command = new CreateCustomerCommand(request);
    return this.commandBus.execute(command);
  }

  @Roles('customer-details', 'admin')
  @UseGuards(GrpcAuthGuard)
  @GrpcMethod(CUSTOMER_SERVICE_NAME)
  async customerDetails(
    request: ICustomerDetailsRequest,
  ): Promise<CustomerDetailsResponse> {
    const query = new CustomerDetailsQuery(request.id);
    return this.queryBus.execute(query);
  }
}
