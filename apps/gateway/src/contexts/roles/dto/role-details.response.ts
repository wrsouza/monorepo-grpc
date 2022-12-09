import { ApiProperty } from '@nestjs/swagger';
import { IRoleDetailsResponse } from '@app/common/interfaces';

export class RoleDetailsResponse implements IRoleDetailsResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  permissions: string[];
}
