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
  Request,
  UseGuards,
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
  ProductDetailsRequest,
  ProductDetailsResponse,
} from './dto';
import { JwtAuthGuard } from '../../data/guards/jwt-auth.guard';

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

  @Post()
  @UseGuards(JwtAuthGuard)
  createProduct(
    @Request() { metadata },
    @Body() request: CreateProductRequest,
  ): Observable<CreateProductResponse> {
    Logger.log(`POST createProduct: ${JSON.stringify(request)}`);
    return this.productService.createProduct(request, metadata);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  productDetails(
    @Request() { metadata },
    @Param() request: ProductDetailsRequest,
  ): Observable<ProductDetailsResponse> {
    Logger.log(`GET productDetails: ${JSON.stringify(request)}`);
    return this.productService.productDetails(request, metadata);
  }
}
