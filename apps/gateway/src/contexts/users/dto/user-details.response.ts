import { ApiProperty } from '@nestjs/swagger';
import { IUserDetailsResponse } from '@app/common/interfaces';

export class UserDetailsResponse implements IUserDetailsResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  isAdmin: boolean;

  @ApiProperty()
  roles: string[];

  @ApiProperty()
  createdAt: string;
}
