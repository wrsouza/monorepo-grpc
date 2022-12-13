import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { CustomerSchema } from '../schemas';
import { v4 as uuid } from 'uuid';

export default class CustomerSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(CustomerSchema);
    await repository.save([
      {
        id: uuid(),
        name: 'John Doe',
        documentNumber: '81287657877',
        address: {
          postalCode: '19050920',
          lineAddress: 'Rua José Bongiovani, 700',
          city: 'Presidente Prudente',
          state: 'SP',
        },
      },
    ]);
  }
}
