import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionResponse {
  @ApiProperty()
  id: string;
}
