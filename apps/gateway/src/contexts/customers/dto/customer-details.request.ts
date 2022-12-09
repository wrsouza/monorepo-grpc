import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { ICustomerDetailsRequest } from '@app/common/interfaces';

export class CustomerDetailsRequest implements ICustomerDetailsRequest {
  @ApiProperty()
  @IsUUID()
  id: string;
}
