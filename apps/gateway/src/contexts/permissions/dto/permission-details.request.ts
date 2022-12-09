import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class PermissionDetailsRequest {
  @ApiProperty()
  @IsUUID()
  id: string;
}
