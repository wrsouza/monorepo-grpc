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
import { ICreateOrderItemRequest } from '@app/common/interfaces';

export class CreateOrderItemRequest implements ICreateOrderItemRequest {
  @ApiProperty({
    type: String,
    example: '',
  })
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
  @ApiProperty({
    type: String,
    example: '',
  })
  @IsUUID()
  customerId: string;

  @ApiProperty({
    type: Number,
    example: ShipmentTypeEnum.Free,
  })
  @IsEnum(ShipmentTypeEnum)
  shipmentType: ShipmentTypeEnum;

  @ApiProperty({
    type: Number,
    example: 10.89,
  })
  @IsNumber()
  shipmentValue: number;

  @ApiProperty({
    type: [CreateOrderItemRequest],
  })
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemRequest)
  items: CreateOrderItemRequest[];
}
