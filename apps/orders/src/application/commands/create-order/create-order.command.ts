import { ICommand } from '@nestjs/cqrs';
import { ICreateOrderRequest } from '@app/common/interfaces';
import { Metadata } from '@grpc/grpc-js';

export class CreateOrderCommand implements ICommand {
  constructor(
    readonly createOrder: ICreateOrderRequest,
    readonly metadata: Metadata,
  ) {}
}
