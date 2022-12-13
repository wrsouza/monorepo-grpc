import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { CategorySchema } from '../schemas';
import { v4 as uuid } from 'uuid';

export default class CategorySeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(CategorySchema);
    await repository.save([
      {
        id: uuid(),
        name: 'New Category',
        slug: 'new-category',
      },
    ]);
  }
}
