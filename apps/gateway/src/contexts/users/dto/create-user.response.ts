import { ApiProperty } from '@nestjs/swagger';
import { ICreateUserResponse } from '@app/common/interfaces';

export class CreateUserResponse implements ICreateUserResponse {
  @ApiProperty()
  id: string;
}
