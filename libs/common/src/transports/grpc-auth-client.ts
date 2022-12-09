import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcAuthClient: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:5051',
    package: ['users', 'auth', 'roles', 'permissions'],
    protoPath: [
      join(__dirname, '..', '..', 'libs', 'common', 'proto', 'users.proto'),
      join(__dirname, '..', '..', 'libs', 'common', 'proto', 'auth.proto'),
      join(__dirname, '..', '..', 'libs', 'common', 'proto', 'roles.proto'),
      join(
        __dirname,
        '..',
        '..',
        'libs',
        'common',
        'proto',
        'permissions.proto',
      ),
    ],
  },
};
