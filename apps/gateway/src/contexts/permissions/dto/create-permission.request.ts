import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ICreatePermissionRequest } from '@app/common/interfaces';

export class CreatePermissionRequest implements ICreatePermissionRequest {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;
}
