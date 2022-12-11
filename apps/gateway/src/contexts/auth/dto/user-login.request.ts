import { ApiProperty } from '@nestjs/swagger';
import { IUserLoginRequest } from '@app/common/interfaces';
import { IsEmail, IsString } from 'class-validator';

export class UserLoginRequest implements IUserLoginRequest {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}
