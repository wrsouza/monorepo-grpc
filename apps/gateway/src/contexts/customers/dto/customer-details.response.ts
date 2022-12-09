import { ApiProperty } from '@nestjs/swagger';
import {
  ICustomerAddressDetailsResponse,
  ICustomerDetailsResponse,
} from '@app/common/interfaces';

class CustomerAddressDetailsResponse
  implements ICustomerAddressDetailsResponse
{
  @ApiProperty()
  postalCode: string;

  @ApiProperty()
  lineAddress: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;
}

export class CustomerDetailsResponse implements ICustomerDetailsResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  documentNumber: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({
    type: CustomerAddressDetailsResponse,
  })
  address: CustomerAddressDetailsResponse;
}
