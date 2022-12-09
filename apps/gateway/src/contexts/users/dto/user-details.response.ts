import { ApiProperty } from '@nestjs/swagger';

export class UserDetailsResponse {
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
  createdAt: Date;
}
