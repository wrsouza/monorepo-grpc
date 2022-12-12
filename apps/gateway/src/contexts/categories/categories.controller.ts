import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  OnModuleInit,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import {
  CATEGORY_PACKAGE_NAME,
  CATEGORY_SERVICE_NAME,
  ICategoryService,
} from '@app/common/interfaces';

import {
  CategoryDetailsRequest,
  CategoryDetailsResponse,
  CreateCategoryRequest,
  CreateCategoryResponse,
} from './dto';
import { JwtAuthGuard } from '../../data/guards/jwt-auth.guard';

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
  @UseGuards(JwtAuthGuard)
  createCategory(
    @Request() { metadata },
    @Body() request: CreateCategoryRequest,
  ): Observable<CreateCategoryResponse> {
    Logger.log(`POST createCategory: ${JSON.stringify(request)}`);
    return this.categoryService.createCategory(request, metadata);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  categoryDetails(
    @Request() { metadata },
    @Param() request: CategoryDetailsRequest,
  ): Observable<CategoryDetailsResponse> {
    Logger.log(`GET categoryDetails: ${JSON.stringify(request)}`);
    return this.categoryService.categoryDetails(request, metadata);
  }
}
