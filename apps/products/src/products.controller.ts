import { Body, Controller, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import { PRODUCT_SERVICE_NAME } from '@app/common/interfaces';
import {
  CreateProductCommand,
  CreateProductRequest,
  CreateProductResponse,
} from './application/commands';
import {
  ProductDetailsQuery,
  ProductDetailsRequest,
  ProductDetailsResponse,
} from './application/queries';

@Controller()
export class ProductsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @GrpcMethod(PRODUCT_SERVICE_NAME)
  async createProduct(
    @Body() request: CreateProductRequest,
  ): Promise<CreateProductResponse> {
    const command = new CreateProductCommand(request);
    return this.commandBus.execute(command);
  }

  @GrpcMethod(PRODUCT_SERVICE_NAME)
  async productDetails(
    @Param() request: ProductDetailsRequest,
  ): Promise<ProductDetailsResponse> {
    const query = new ProductDetailsQuery(request.id);
    return this.queryBus.execute(query);
  }
}
