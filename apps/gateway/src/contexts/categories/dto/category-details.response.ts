import { ApiProperty } from '@nestjs/swagger';
import { ICategoryDetailsResponse } from '@app/common/interfaces/categories.interface';

export class CategoryDetailsResponse implements ICategoryDetailsResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  createdAt: Date;
}
