import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IOrder, OrderSchema } from '@app/common/database/schemas';
import { OrderMapper } from '../../../domain-models/order.mapper';
import { OrderDetailsQuery } from './order-details.query';
import { OrderDetailsResponse } from './order-details.response';

@QueryHandler(OrderDetailsQuery)
export class OrderDetailsHandler implements IQueryHandler<OrderDetailsQuery> {
  private readonly mapper: OrderMapper;

  constructor(
    @InjectRepository(OrderSchema)
    private repository: Repository<IOrder>,
  ) {
    this.mapper = new OrderMapper();
  }

  async execute({ id }: OrderDetailsQuery): Promise<OrderDetailsResponse> {
    const record = await this.repository.findOneBy({ id });
    if (!record) {
      throw new NotFoundException('order not found');
    }
    const order = this.mapper.toDomain(record);
    return new OrderDetailsResponse(order);
  }
}
