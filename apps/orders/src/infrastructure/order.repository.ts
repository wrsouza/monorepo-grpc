import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { IOrder, OrderSchema } from '@app/common/database/schemas';
import { Order } from '../domain-models/order';
import { OrderMapper } from '../domain-models/order.mapper';

export class OrderRepository {
  private readonly mapper: OrderMapper;

  constructor(
    @InjectRepository(OrderSchema)
    private repository: Repository<IOrder>,
  ) {
    this.mapper = new OrderMapper();
  }

  async saveOrder(order: Order): Promise<void> {
    const record = this.mapper.toPersistence(order);
    await this.repository.save(record);
  }

  async findOrder(where: FindOptionsWhere<IOrder>): Promise<Order> {
    const record = await this.repository.findOneBy(where);
    if (!record) {
      return null;
    }
    return this.mapper.toDomain(record);
  }
}
