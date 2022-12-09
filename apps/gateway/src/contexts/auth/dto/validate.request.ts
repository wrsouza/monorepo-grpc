import { ApiProperty } from '@nestjs/swagger';
import { IValidateRequest } from '../../../../../../libs/common/src/interfaces';

export class ValidateRequest implements IValidateRequest {
  @ApiProperty()
  token: string;
}
