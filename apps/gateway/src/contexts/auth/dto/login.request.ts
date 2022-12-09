import { ApiProperty } from '@nestjs/swagger';
import { ILoginRequest } from '@app/common/interfaces';
import { IsEmail } from 'class-validator';

export class LoginRequest implements ILoginRequest {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  password: string;
}
