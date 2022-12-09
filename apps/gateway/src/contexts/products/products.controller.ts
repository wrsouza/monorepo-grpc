import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  OnModuleInit,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import {
  IProductService,
  PRODUCT_PACKAGE_NAME,
  PRODUCT_SERVICE_NAME,
} from '@app/common/interfaces';
import {
  CreateProductRequest,
  CreateProductResponse,
  PaginateProductsRequest,
  PaginateProductsResponse,
  ProductDetailsRequest,
  ProductDetailsResponse,
} from './dto';

@ApiBearerAuth()
@ApiTags('Products')
@Controller('products')
export class ProductsController implements OnModuleInit {
  private productService: IProductService;

  constructor(
    @Inject(PRODUCT_PACKAGE_NAME) private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.productService =
      this.client.getService<IProductService>(PRODUCT_SERVICE_NAME);
  }

  @Get()
  paginateProducts(
    @Query() paginateProductRequest: PaginateProductsRequest,
  ): Observable<PaginateProductsResponse> {
    Logger.log(
      `GET paginateProducts: ${JSON.stringify(paginateProductRequest)}`,
    );
    return this.productService.paginateProducts(paginateProductRequest);
  }

  @Post()
  createProduct(
    @Body() createProductRequest: CreateProductRequest,
  ): Observable<CreateProductResponse> {
    Logger.log(`POST createProduct: ${JSON.stringify(createProductRequest)}`);
    return this.productService.createProduct(createProductRequest);
  }

  @Get(':id')
  productDetails(
    @Param() productDetailsRequest: ProductDetailsRequest,
  ): Observable<ProductDetailsResponse> {
    Logger.log(`GET productDetails: ${JSON.stringify(productDetailsRequest)}`);
    return this.productService.productDetails(productDetailsRequest);
  }
}
