import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { ICategoryDetailsRequest } from '@app/common/interfaces/categories.interface';

export class CategoryDetailsRequest implements ICategoryDetailsRequest {
  @ApiProperty()
  @IsUUID()
  id: string;
}
