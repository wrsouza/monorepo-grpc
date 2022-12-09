import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { IUserDetailsRequest } from '@app/common/interfaces';

export class UserDetailsRequest implements IUserDetailsRequest {
  @ApiProperty()
  @IsUUID()
  id: string;
}
