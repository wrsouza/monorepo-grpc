import { ApiProperty } from '@nestjs/swagger';
import {
  IPaginateProductItemResponse,
  IPaginateProductsResponse,
} from '@app/common/interfaces';

class PaginateProductItemResponse implements IPaginateProductItemResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  sku: string;

  @ApiProperty()
  price: number;
}

export class PaginateProductsResponse implements IPaginateProductsResponse {
  @ApiProperty()
  data: PaginateProductItemResponse[];

  @ApiProperty()
  page: number;

  @ApiProperty()
  perPage: number;

  @ApiProperty()
  sort: string;

  @ApiProperty()
  total: number;
}
