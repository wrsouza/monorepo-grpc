import { ApiProperty } from '@nestjs/swagger';
import { IUserLoginRequest } from '@app/common/interfaces';
import { IsEmail, IsString } from 'class-validator';

export class UserLoginRequest implements IUserLoginRequest {
  @ApiProperty({
    type: String,
    example: 'john.doe@domain.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    example: 'password',
  })
  @IsString()
  password: string;
}
