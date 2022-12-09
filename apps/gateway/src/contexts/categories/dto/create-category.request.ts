import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ICreateCategoryRequest } from '@app/common/interfaces/categories.interface';

export class CreateCategoryRequest implements ICreateCategoryRequest {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  slug: string;
}
