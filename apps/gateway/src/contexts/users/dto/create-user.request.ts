import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsString } from 'class-validator';
import { ICreateUserRequest } from '@app/common/interfaces';

export class CreateUserRequest implements ICreateUserRequest {
  @ApiProperty({
    type: String,
    example: 'John Doe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    example: 'john.doe@domain.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    type: String,
    example: 'password',
  })
  @IsString()
  password: string;

  @ApiProperty({
    type: Boolean,
    example: false,
  })
  @IsBoolean()
  isAdmin: boolean;

  @ApiProperty({
    type: [String],
    example: [],
  })
  @IsArray()
  roles: string[];
}
