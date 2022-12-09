import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import {
  AUTH_PACKAGE_NAME,
  PERMISSION_PACKAGE_NAME,
  ROLE_PACKAGE_NAME,
  USER_PACKAGE_NAME,
} from '../interfaces';

export const grpcAuthClient: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:5051',
    package: [
      USER_PACKAGE_NAME,
      AUTH_PACKAGE_NAME,
      ROLE_PACKAGE_NAME,
      PERMISSION_PACKAGE_NAME,
    ],
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
