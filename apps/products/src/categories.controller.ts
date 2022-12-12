import { Body, Controller, Param, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import { CATEGORY_SERVICE_NAME } from '@app/common/interfaces';
import {
  CreateCategoryCommand,
  CreateCategoryRequest,
  CreateCategoryResponse,
} from './application/commands';
import {
  CategoryDetailsQuery,
  CategoryDetailsRequest,
  CategoryDetailsResponse,
} from './application/queries';
import { Roles } from '@app/common/decorators';
import { GrpcAuthGuard } from '@app/common/guards';

@Controller()
export class CategoriesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Roles('create-category', 'admin')
  @UseGuards(GrpcAuthGuard)
  @GrpcMethod(CATEGORY_SERVICE_NAME)
  async createCategory(
    request: CreateCategoryRequest,
  ): Promise<CreateCategoryResponse> {
    const command = new CreateCategoryCommand(request);
    return this.commandBus.execute(command);
  }

  @Roles('category-details', 'admin')
  @UseGuards(GrpcAuthGuard)
  @GrpcMethod(CATEGORY_SERVICE_NAME)
  async categoryDetails(
    request: CategoryDetailsRequest,
  ): Promise<CategoryDetailsResponse> {
    const query = new CategoryDetailsQuery(request.id);
    return this.queryBus.execute(query);
  }
}
