import {
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  CUSTOMER_PACKAGE_NAME,
  CUSTOMER_SERVICE_NAME,
  ICustomerDetailsResponse,
  ICustomerService,
  IProductDetailsResponse,
  IProductService,
  PRODUCT_PACKAGE_NAME,
  PRODUCT_SERVICE_NAME,
} from '@app/common/interfaces';
import { CreateOrderRequest } from '../application/commands/create-order/create-order.request';
import { Order } from '../domain-models/order';
import { OrderAddress } from '../domain-models/order-address';
import { OrderCustomer } from '../domain-models/order-customer';
import { OrderId } from '../domain-models/order-id';
import { OrderItem } from '../domain-models/order-item';
import { OrderItemId } from '../domain-models/order-item-id';

@Injectable()
export class OrderService implements OnModuleInit {
  private customerService: ICustomerService;
  private productService: IProductService;

  constructor(
    @Inject(CUSTOMER_PACKAGE_NAME) private customerClient: ClientGrpc,
    @Inject(PRODUCT_PACKAGE_NAME) private productClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.customerService = this.customerClient.getService<ICustomerService>(
      CUSTOMER_SERVICE_NAME,
    );
    this.productService =
      this.productClient.getService<IProductService>(PRODUCT_SERVICE_NAME);
  }

  async createOrder(orderData: CreateOrderRequest): Promise<Order> {
    const customerDomain = await this.findCustomer(orderData.customerId);
    const customer = this.setOrderCustomer(customerDomain);
    const address = this.setOrderAddress(customerDomain);

    const items = await this.getOrderItems(orderData);
    const subtotal = this.getSubTotal(items);
    const discount = this.getDiscount(items);
    const total = subtotal - discount + orderData.shipmentValue;

    return new Order({
      id: new OrderId(),
      subtotal,
      discount,
      shipmentType: orderData.shipmentType,
      shipmentValue: orderData.shipmentValue,
      total,
      customer,
      address,
      items,
    });
  }

  setOrderCustomer(customer: ICustomerDetailsResponse): OrderCustomer {
    return new OrderCustomer({
      name: customer.name,
      documentNumber: customer.documentNumber,
      customerId: customer.id,
    });
  }

  setOrderAddress(customer: ICustomerDetailsResponse): OrderAddress {
    return new OrderAddress({
      postalCode: customer.address.postalCode,
      lineAddress: customer.address.lineAddress,
      city: customer.address.city,
      state: customer.address.state,
    });
  }

  getSubTotal(items: OrderItem[]): number {
    return items.reduce(
      (previousValue, item) => previousValue + item.price * item.quantity,
      0,
    );
  }

  getDiscount(items: OrderItem[]): number {
    return items.reduce(
      (previousValue, item) => previousValue + item.discount,
      0,
    );
  }

  async getOrderItems(orderData: CreateOrderRequest): Promise<OrderItem[]> {
    const items: OrderItem[] = [];
    for (const item of orderData.items) {
      const product = await this.findProduct(item.productId);
      if (!product) {
        throw new NotFoundException(`product ${item.productId} not found`);
      }
      items.push(
        new OrderItem({
          id: new OrderItemId(),
          name: product.name,
          sku: product.sku,
          quantity: item.quantity,
          price: product.price,
          discount: item.discount,
          productId: product.id,
        }),
      );
    }
    return items;
  }

  async findProduct(id: string): Promise<IProductDetailsResponse> {
    const product = await firstValueFrom(
      this.productService.productDetails({ id }),
    );
    if (!product.id) {
      throw new NotFoundException(`product ${id} not found`);
    }
    return product;
  }

  async findCustomer(id: string): Promise<ICustomerDetailsResponse> {
    const customer = await firstValueFrom(
      this.customerService.customerDetails({ id }),
    );
    if (!customer.id) {
      throw new NotFoundException(`customer ${id} not found`);
    }
    return customer;
  }
}
