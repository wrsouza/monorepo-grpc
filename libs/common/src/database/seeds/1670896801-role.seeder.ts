import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { PermissionSchema, RoleSchema } from '../schemas';
import { v4 as uuid } from 'uuid';

export default class RoleSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const permissionRepository = dataSource.getRepository(PermissionSchema);
    const permissions = await permissionRepository.find({});
    const repository = dataSource.getRepository(RoleSchema);
    await repository.save([
      {
        id: uuid(),
        name: 'supervisor',
        description: 'Supervisor Role',
        permissions,
      },
    ]);
  }
}
