import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { grpcCustomersClient } from '@app/common/transports';
import { CustomersModule } from './customers.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CustomersModule,
    grpcCustomersClient,
  );
  await app.listen();
}
bootstrap();
