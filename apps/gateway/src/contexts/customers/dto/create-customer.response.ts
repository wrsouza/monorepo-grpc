import { ApiProperty } from '@nestjs/swagger';
import { ICreateCustomerResponse } from '@app/common/interfaces';

export class CreateCustomerResponse implements ICreateCustomerResponse {
  @ApiProperty()
  id: string;
}
