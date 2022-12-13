import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import {
  PermissionSchema,
  RoleSchema,
  UserSchema,
  CustomerSchema,
  CategorySchema,
  ProductSchema,
  OrderSchema,
} from '../schemas';

export default class ResetSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const orderRepository = dataSource.getRepository(OrderSchema);
    await orderRepository.remove(await orderRepository.find({}));

    const productRepository = dataSource.getRepository(ProductSchema);
    await productRepository.remove(await productRepository.find({}));

    const categoryRepository = dataSource.getRepository(CategorySchema);
    await categoryRepository.remove(await categoryRepository.find({}));

    const customerRepository = dataSource.getRepository(CustomerSchema);
    await customerRepository.remove(await customerRepository.find({}));

    const userRepository = dataSource.getRepository(UserSchema);
    await userRepository.remove(await userRepository.find({}));

    const roleRepository = dataSource.getRepository(RoleSchema);
    await roleRepository.remove(await roleRepository.find({}));

    const permissionRepository = dataSource.getRepository(PermissionSchema);
    await permissionRepository.remove(await permissionRepository.find({}));
  }
}
