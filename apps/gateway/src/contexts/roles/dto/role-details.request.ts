import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class RoleDetailsRequest {
  @ApiProperty()
  @IsUUID()
  id: string;
}
