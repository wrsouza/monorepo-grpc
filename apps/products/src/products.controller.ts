import { Body, Controller, Param, UseGuards } from '@nestjs/common';
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
import { Roles } from '@app/common/decorators';
import { GrpcAuthGuard } from '@app/common/guards';

@Controller()
export class ProductsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Roles('create-product', 'admin')
  @UseGuards(GrpcAuthGuard)
  @GrpcMethod(PRODUCT_SERVICE_NAME)
  async createProduct(
    request: CreateProductRequest,
  ): Promise<CreateProductResponse> {
    const command = new CreateProductCommand(request);
    return this.commandBus.execute(command);
  }

  @Roles('product-details', 'admin')
  @UseGuards(GrpcAuthGuard)
  @GrpcMethod(PRODUCT_SERVICE_NAME)
  async productDetails(
    request: ProductDetailsRequest,
  ): Promise<ProductDetailsResponse> {
    const query = new ProductDetailsQuery(request.id);
    return this.queryBus.execute(query);
  }
}
