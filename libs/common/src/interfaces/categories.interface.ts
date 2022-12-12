import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';

export const CATEGORY_PACKAGE_NAME = 'categories';
export const CATEGORY_SERVICE_NAME = 'CategoryService';

export interface ICategoryService {
  createCategory(
    request: ICreateCategoryRequest,
    metadata?: Metadata,
  ): Observable<ICreateCategoryResponse>;
  categoryDetails(
    request: ICategoryDetailsRequest,
    metadata?: Metadata,
  ): Observable<ICategoryDetailsResponse>;
}

export interface ICreateCategoryRequest {
  name: string;
  slug: string;
}

export interface ICreateCategoryResponse {
  status?: number;
  error?: string[];
  id: string;
}

export interface ICategoryDetailsRequest {
  id: string;
}

export interface ICategoryDetailsResponse {
  status?: number;
  error?: string[];
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
}
