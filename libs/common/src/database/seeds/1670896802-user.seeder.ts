import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { UserSchema, RoleSchema } from '../schemas';
import { v4 as uuid } from 'uuid';
import { hashSync } from 'bcrypt';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const roleRepository = dataSource.getRepository(RoleSchema);
    const roles = await roleRepository.find({});
    const repository = dataSource.getRepository(UserSchema);
    await repository.save([
      {
        id: uuid(),
        name: 'John Doe',
        email: 'john.doe@domain.com',
        password: hashSync('password', 8),
        isAdmin: false,
        roles,
      },
    ]);
  }
}
