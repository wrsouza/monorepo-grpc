import { ApiProperty } from '@nestjs/swagger';
import { IPermissionDetailsResponse } from '@app/common/interfaces';

export class PermissionDetailsResponse implements IPermissionDetailsResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  createdAt: string;
}
