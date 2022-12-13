import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { OrderService } from '../../../domain-services/order.service';
import { OrderRepository } from '../../../infrastructure/order.repository';
import { OrderCreatedLogEvent } from '../../events';
import { CreateOrderCommand } from './create-order.command';
import { CreateOrderResponse } from './create-order.response';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(
    private readonly service: OrderService,
    private readonly repository: OrderRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute({
    createOrder,
    metadata,
  }: CreateOrderCommand): Promise<CreateOrderResponse> {
    console.log('createOrder', createOrder);
    const order = await this.service.createOrder(createOrder, metadata);
    await this.repository.saveOrder(order);

    const event = new OrderCreatedLogEvent(order);
    this.eventBus.publish(event);

    return new CreateOrderResponse(order);
  }
}
