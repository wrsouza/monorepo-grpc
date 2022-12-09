import { ApiProperty } from '@nestjs/swagger';

export class RoleDetailsResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  permissions: string[];
}
