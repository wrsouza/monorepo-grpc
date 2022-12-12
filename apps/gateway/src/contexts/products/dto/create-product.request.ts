import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNumber, IsString } from 'class-validator';
import { ICreateProductRequest } from '@app/common/interfaces';

export class CreateProductRequest implements ICreateProductRequest {
  @ApiProperty({
    type: String,
    example: 'Product Test',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    example: '123',
  })
  @IsString()
  sku: string;

  @ApiProperty({
    type: String,
    example: 'product-test-123',
  })
  @IsString()
  slug: string;

  @ApiProperty({
    type: Number,
    example: 150.89,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    type: Number,
    example: 10,
  })
  @IsInt()
  stock: number;

  @ApiProperty({
    example: [],
  })
  @IsArray()
  categories: string[];
}
