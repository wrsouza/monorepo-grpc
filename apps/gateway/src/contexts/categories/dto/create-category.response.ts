import { ApiProperty } from '@nestjs/swagger';
import { ICreateCategoryResponse } from '@app/common/interfaces/categories.interface';

export class CreateCategoryResponse implements ICreateCategoryResponse {
  @ApiProperty()
  id: string;
}
