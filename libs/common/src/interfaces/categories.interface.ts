import { Observable } from 'rxjs';

export const CATEGORY_PACKAGE_NAME = 'categories';
export const CATEGORY_SERVICE_NAME = 'CategoryService';

export interface ICategoryService {
  createCategory(
    data: ICreateCategoryRequest,
  ): Observable<ICreateCategoryResponse>;
  categoryDetails(
    data: ICategoryDetailsRequest,
  ): Observable<ICategoryDetailsResponse>;
}

export interface ICreateCategoryRequest {
  name: string;
  slug: string;
}

export interface ICreateCategoryResponse {
  id: string;
}

export interface ICategoryDetailsRequest {
  id: string;
}

export interface ICategoryDetailsResponse {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
}
