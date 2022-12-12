import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ICreateCategoryRequest } from '@app/common/interfaces/categories.interface';

export class CreateCategoryRequest implements ICreateCategoryRequest {
  @ApiProperty({
    type: String,
    example: 'New Category',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    example: 'new-category',
  })
  @IsString()
  slug: string;
}
