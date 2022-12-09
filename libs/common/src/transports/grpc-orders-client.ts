import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcOrdersClient: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:5054',
    package: ['orders'],
    protoPath: [
      join(__dirname, '..', '..', 'libs', 'common', 'proto', 'orders.proto'),
    ],
  },
};
