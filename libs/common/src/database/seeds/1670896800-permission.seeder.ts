import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { PermissionSchema } from '../schemas';
import { v4 as uuid } from 'uuid';

export default class PermissionSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(PermissionSchema);
    const permissions = [
      {
        id: uuid(),
        name: 'create-permission',
        description: 'Create Permission',
      },
      {
        id: uuid(),
        name: 'permission-details',
        description: 'Show Permission Details',
      },
      {
        id: uuid(),
        name: 'create-role',
        description: 'Create Role',
      },
      {
        id: uuid(),
        name: 'role-details',
        description: 'Show Role Details',
      },
      {
        id: uuid(),
        name: 'create-user',
        description: 'Create User',
      },
      {
        id: uuid(),
        name: 'user-details',
        description: 'Show User Details',
      },
      {
        id: uuid(),
        name: 'create-customer',
        description: 'Create Customer',
      },
      {
        id: uuid(),
        name: 'customer-details',
        description: 'Show Customer Details',
      },
      {
        id: uuid(),
        name: 'create-product',
        description: 'Create Product',
      },
      {
        id: uuid(),
        name: 'product-details',
        description: 'Show Product Details',
      },
      {
        id: uuid(),
        name: 'create-category',
        description: 'Create Category',
      },
      {
        id: uuid(),
        name: 'category-details',
        description: 'Show Category Details',
      },
      {
        id: uuid(),
        name: 'create-order',
        description: 'Create Order',
      },
      {
        id: uuid(),
        name: 'order-details',
        description: 'Show Order Details',
      },
    ];
    await repository.insert(permissions);
  }
}
