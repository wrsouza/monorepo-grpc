import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcProductsClient: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:5053',
    package: ['products', 'categories'],
    protoPath: [
      join(__dirname, '..', '..', 'libs', 'common', 'proto', 'products.proto'),
      join(
        __dirname,
        '..',
        '..',
        'libs',
        'common',
        'proto',
        'categories.proto',
      ),
    ],
  },
};
