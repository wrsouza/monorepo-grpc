import { ApiProperty } from '@nestjs/swagger';
import { ICreateRoleResponse } from '@app/common/interfaces';

export class CreateRoleResponse implements ICreateRoleResponse {
  @ApiProperty()
  id: string;
}
