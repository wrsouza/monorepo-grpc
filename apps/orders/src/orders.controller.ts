import { Controller, Logger, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import {
  ICreateOrderRequest,
  ORDER_SERVICE_NAME,
} from '@app/common/interfaces';
import {
  CreateOrderCommand,
  CreateOrderResponse,
} from './application/commands';
import {
  OrderDetailsQuery,
  OrderDetailsRequest,
  OrderDetailsResponse,
} from './application/queries';
import { Roles } from '@app/common/decorators';
import { GrpcAuthGuard } from '@app/common/guards';
import { Metadata } from '@grpc/grpc-js';

@Controller()
export class OrdersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Roles('create-order', 'admin')
  @UseGuards(GrpcAuthGuard)
  @GrpcMethod(ORDER_SERVICE_NAME)
  async createOrder(
    request: ICreateOrderRequest,
    metadata: Metadata,
  ): Promise<CreateOrderResponse> {
    Logger.log(`GRPC createOrderRequest: ${JSON.stringify(request)}`);
    const command = new CreateOrderCommand(request, metadata);
    return this.commandBus.execute(command);
  }

  @Roles('order-details', 'admin')
  @UseGuards(GrpcAuthGuard)
  @GrpcMethod(ORDER_SERVICE_NAME)
  async orderDetails(
    request: OrderDetailsRequest,
  ): Promise<OrderDetailsResponse> {
    const query = new OrderDetailsQuery(request.id);
    return this.queryBus.execute(query);
  }
}
