import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNumber, IsString } from 'class-validator';
import { ICreateProductRequest } from '@app/common/interfaces';

export class CreateProductRequest implements ICreateProductRequest {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  sku: string;

  @ApiProperty()
  @IsString()
  slug: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsInt()
  stock: number;

  @ApiProperty()
  @IsArray()
  categories: string[];
}
