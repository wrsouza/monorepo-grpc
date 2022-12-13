import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import {
  CustomerSchema,
  ProductSchema,
  OrderSchema,
  ShipmentTypeEnum,
} from '../schemas';
import { v4 as uuid } from 'uuid';

export default class OrderSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const productRepository = dataSource.getRepository(ProductSchema);
    const products = await productRepository.find({});

    const customerRepository = dataSource.getRepository(CustomerSchema);
    const customer = await customerRepository.findOneBy({
      documentNumber: '81287657877',
    });

    const repository = dataSource.getRepository(OrderSchema);
    await repository.save([
      {
        id: uuid(),
        subtotal: products.reduce((subtotal, product) => {
          subtotal += parseFloat(product.price.toString());
          return subtotal;
        }, 0),
        shipmentType: ShipmentTypeEnum.Slow,
        shipmentValue: 0,
        discount: 0,
        total: products.reduce((total, product) => {
          total += parseFloat(product.price.toString());
          return total;
        }, 0),
        address: {
          postalCode: customer.address.postalCode,
          lineAddress: customer.address.lineAddress,
          city: customer.address.city,
          state: customer.address.state,
        },
        items: products.map((product) => ({
          id: uuid(),
          name: product.name,
          sku: product.sku,
          quantity: 1,
          price: product.price,
          discount: 0,
          product: product,
        })),
        customer: {
          id: customer.id,
          name: customer.name,
          documentNumber: customer.documentNumber,
        },
      },
    ]);
  }
}
