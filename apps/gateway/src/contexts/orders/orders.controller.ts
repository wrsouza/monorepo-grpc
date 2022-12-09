import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  OnModuleInit,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  IOrderService,
  ORDER_PACKAGE_NAME,
  ORDER_SERVICE_NAME,
} from '@app/common/interfaces';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateOrderRequest } from './dto/create-order.request';
import { CreateOrderResponse } from './dto/create-order.response';
import { OrderDetailsRequest } from './dto/order-details.request';
import { OrderDetailsResponse } from './dto/order-details.response';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController implements OnModuleInit {
  private orderService: IOrderService;

  constructor(
    @Inject(ORDER_PACKAGE_NAME) private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.orderService =
      this.client.getService<IOrderService>(ORDER_SERVICE_NAME);
  }

  @Post()
  createProduct(
    @Body() request: CreateOrderRequest,
  ): Observable<CreateOrderResponse> {
    Logger.log(`POST createOrder: ${JSON.stringify(request)}`);
    return this.orderService.createOrder(request);
  }

  @Get(':id')
  productDetails(
    @Param() request: OrderDetailsRequest,
  ): Observable<OrderDetailsResponse> {
    Logger.log(`GET orderDetails: ${JSON.stringify(request)}`);
    return this.orderService.orderDetails(request);
  }
}
