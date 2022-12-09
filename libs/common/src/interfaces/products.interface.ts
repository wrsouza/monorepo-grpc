import { Observable } from 'rxjs';

export const PRODUCT_PACKAGE_NAME = 'products';
export const PRODUCT_SERVICE_NAME = 'ProductService';

export interface IProductService {
  paginateProducts(
    data: IPaginateProductsRequest,
  ): Observable<IPaginateProductsResponse>;
  createProduct(
    data: ICreateProductRequest,
  ): Observable<ICreateProductResponse>;
  productDetails(
    data: IProductDetailsRequest,
  ): Observable<IProductDetailsResponse>;
}

export interface IPaginateProductsRequest {
  page?: number;
  sort?: string;
  perPage?: number;
}

export interface IPaginateProductsResponse {
  status?: number;
  error?: string[];
  data: IPaginateProductItemResponse[];
  page: number;
  perPage: number;
  sort: string;
  total: number;
}

export interface IPaginateProductItemResponse {
  id: string;
  name: string;
  sku: string;
  price: number;
}

export interface ICreateProductRequest {
  name: string;
  sku: string;
  slug: string;
  price: number;
  stock: number;
  categories: string[];
}

export interface ICreateProductResponse {
  status?: number;
  error?: string[];
  id: string;
}

export interface IProductDetailsRequest {
  id: string;
}

export interface IProductDetailsResponse {
  status?: number;
  error?: string[];
  id: string;
  name: string;
  sku: string;
  slug: string;
  price: number;
  stock: number;
  createdAt: Date;
  categories: string[];
}
