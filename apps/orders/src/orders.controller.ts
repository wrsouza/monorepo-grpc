import { Controller, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import { ORDER_SERVICE_NAME } from '@app/common/interfaces';
import {
  CreateOrderCommand,
  CreateOrderRequest,
  CreateOrderResponse,
} from './application/commands';
import {
  OrderDetailsQuery,
  OrderDetailsRequest,
  OrderDetailsResponse,
} from './application/queries';

@Controller()
export class OrdersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @GrpcMethod(ORDER_SERVICE_NAME)
  async createOrder(request: CreateOrderRequest): Promise<CreateOrderResponse> {
    Logger.log(`GRPC createOrderRequest: ${JSON.stringify(request)}`);
    const command = new CreateOrderCommand(request);
    return this.commandBus.execute(command);
  }

  @GrpcMethod(ORDER_SERVICE_NAME)
  async orderDetails(
    request: OrderDetailsRequest,
  ): Promise<OrderDetailsResponse> {
    const query = new OrderDetailsQuery(request.id);
    return this.queryBus.execute(query);
  }
}
