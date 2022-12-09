import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { ICreateRoleRequest } from '@app/common/interfaces';

export class CreateRoleRequest implements ICreateRoleRequest {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsArray()
  permissions: string[];
}
