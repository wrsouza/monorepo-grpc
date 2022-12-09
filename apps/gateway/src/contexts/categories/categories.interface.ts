import { Observable } from 'rxjs';
import {
  CategoryDetailsRequest,
  CategoryDetailsResponse,
  CreateCategoryRequest,
  CreateCategoryResponse,
} from './dto';

export interface CategoryService {
  createCategory(
    data: CreateCategoryRequest,
  ): Observable<CreateCategoryResponse>;

  categoryDetails(
    data: CategoryDetailsRequest,
  ): Observable<CategoryDetailsResponse>;
}
