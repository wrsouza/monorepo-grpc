import { ApiProperty } from '@nestjs/swagger';
import { ICreateOrderResponse } from '@app/common/interfaces';

export class CreateOrderResponse implements ICreateOrderResponse {
  @ApiProperty()
  id: string;
}
