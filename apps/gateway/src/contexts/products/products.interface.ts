import { Observable } from 'rxjs';
import {
  CreateProductRequest,
  CreateProductResponse,
  PaginateProductsRequest,
  PaginateProductsResponse,
  ProductDetailsRequest,
  ProductDetailsResponse,
} from './dto';

export interface ProductService {
  paginateProducts(
    data: PaginateProductsRequest,
  ): Observable<PaginateProductsResponse>;

  createProduct(data: CreateProductRequest): Observable<CreateProductResponse>;

  productDetails(
    data: ProductDetailsRequest,
  ): Observable<ProductDetailsResponse>;
}
