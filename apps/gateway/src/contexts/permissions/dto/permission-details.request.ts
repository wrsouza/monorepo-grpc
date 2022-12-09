import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { IPermissionDetailsRequest } from '@app/common/interfaces';

export class PermissionDetailsRequest implements IPermissionDetailsRequest {
  @ApiProperty()
  @IsUUID()
  id: string;
}
