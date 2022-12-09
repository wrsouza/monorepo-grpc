import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleResponse {
  @ApiProperty()
  id: string;
}
