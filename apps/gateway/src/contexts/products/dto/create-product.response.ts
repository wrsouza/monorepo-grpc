import { ApiProperty } from '@nestjs/swagger';
import { ICreateProductResponse } from '@app/common/interfaces';

export class CreateProductResponse implements ICreateProductResponse {
  @ApiProperty()
  id: string;
}
