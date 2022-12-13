import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { CategorySchema, ProductSchema } from '../schemas';
import { v4 as uuid } from 'uuid';

export default class ProductSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const categoryRepository = dataSource.getRepository(CategorySchema);
    const categories = await categoryRepository.find({});
    const repository = dataSource.getRepository(ProductSchema);
    await repository.save([
      {
        id: uuid(),
        name: 'Product Test 1',
        sku: '123',
        slug: 'product-test-123',
        price: 150.0,
        stock: 10,
        categories,
      },
      {
        id: uuid(),
        name: 'Product Test 2',
        sku: '456',
        slug: 'product-test-456',
        price: 230.0,
        stock: 25,
        categories,
      },
    ]);
  }
}
