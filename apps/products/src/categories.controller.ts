import { Body, Controller, Param } from '@nestjs/common';
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

@Controller()
export class CategoriesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @GrpcMethod(CATEGORY_SERVICE_NAME)
  async createCategory(
    @Body() request: CreateCategoryRequest,
  ): Promise<CreateCategoryResponse> {
    const command = new CreateCategoryCommand(request);
    return this.commandBus.execute(command);
  }

  @GrpcMethod(CATEGORY_SERVICE_NAME)
  async categoryDetails(
    @Param() request: CategoryDetailsRequest,
  ): Promise<CategoryDetailsResponse> {
    const query = new CategoryDetailsQuery(request.id);
    return this.queryBus.execute(query);
  }
}
