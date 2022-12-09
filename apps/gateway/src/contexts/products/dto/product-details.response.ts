import { ApiProperty } from '@nestjs/swagger';
import { IProductDetailsResponse } from '@app/common/interfaces';

export class ProductDetailsResponse implements IProductDetailsResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  sku: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  stock: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  categories: string[];
}
