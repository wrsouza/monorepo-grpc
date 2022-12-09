import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { IOrderDetailsRequest } from '@app/common/interfaces';

export class OrderDetailsRequest implements IOrderDetailsRequest {
  @ApiProperty()
  @IsUUID()
  id: string;
}
