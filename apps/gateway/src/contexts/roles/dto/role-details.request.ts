import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { IRoleDetailsRequest } from '@app/common/interfaces';

export class RoleDetailsRequest implements IRoleDetailsRequest {
  @ApiProperty()
  @IsUUID()
  id: string;
}
