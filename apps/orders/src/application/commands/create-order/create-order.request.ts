import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ShipmentTypeEnum } from '@app/common/database/schemas';

export class CreateOrderItemRequest {
  @ApiProperty()
  @IsUUID()
  productId: string;

  @ApiProperty()
  @IsInt()
  quantity: number;

  @ApiProperty()
  @IsNumber()
  discount: number;
}

export class CreateOrderRequest {
  @ApiProperty()
  @IsUUID()
  customerId: string;

  @ApiProperty()
  @IsEnum(ShipmentTypeEnum)
  shipmentType: ShipmentTypeEnum;

  @ApiProperty()
  @IsNumber()
  shipmentValue: number;

  @ApiProperty({
    type: [CreateOrderItemRequest],
  })
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemRequest)
  items: CreateOrderItemRequest[];
}
