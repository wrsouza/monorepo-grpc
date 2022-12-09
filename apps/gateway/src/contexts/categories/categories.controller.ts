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
import { ClientGrpc } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import {
  CATEGORY_PACKAGE_NAME,
  CATEGORY_SERVICE_NAME,
  ICategoryService,
} from '@app/common/interfaces/categories.interface';

import {
  CategoryDetailsRequest,
  CategoryDetailsResponse,
  CreateCategoryRequest,
  CreateCategoryResponse,
} from './dto';

@ApiBearerAuth()
@ApiTags('Categories')
@Controller('categories')
export class CategoriesController implements OnModuleInit {
  private categoryService: ICategoryService;

  constructor(
    @Inject(CATEGORY_PACKAGE_NAME) private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.categoryService = this.client.getService<ICategoryService>(
      CATEGORY_SERVICE_NAME,
    );
  }

  @Post()
  createCategory(
    @Body() createCategoryRequest: CreateCategoryRequest,
  ): Observable<CreateCategoryResponse> {
    Logger.log(`POST createCategory: ${JSON.stringify(createCategoryRequest)}`);
    return this.categoryService.createCategory(createCategoryRequest);
  }

  @Get(':id')
  categoryDetails(
    @Param() categoryDetailsRequest: CategoryDetailsRequest,
  ): Observable<CategoryDetailsResponse> {
    Logger.log(
      `GET categoryDetails: ${JSON.stringify(categoryDetailsRequest)}`,
    );
    return this.categoryService.categoryDetails(categoryDetailsRequest);
  }
}
