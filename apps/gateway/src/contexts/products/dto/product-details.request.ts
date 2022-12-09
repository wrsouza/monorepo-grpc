import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { IProductDetailsRequest } from '@app/common/interfaces';

export class ProductDetailsRequest implements IProductDetailsRequest {
  @ApiProperty()
  @IsUUID()
  id: string;
}
