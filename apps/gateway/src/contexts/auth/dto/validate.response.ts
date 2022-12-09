import { ApiProperty } from '@nestjs/swagger';
import { IValidateResponse } from '../../../../../../libs/common/src/interfaces';

export class ValidateResponse implements IValidateResponse {
  @ApiProperty()
  id: string;
}
