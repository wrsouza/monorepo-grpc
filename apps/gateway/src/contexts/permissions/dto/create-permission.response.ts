import { ApiProperty } from '@nestjs/swagger';
import { ICreatePermissionResponse } from '@app/common/interfaces';

export class CreatePermissionResponse implements ICreatePermissionResponse {
  @ApiProperty()
  id: string;
}
