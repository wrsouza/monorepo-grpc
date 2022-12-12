import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { grpcCustomersClient } from '@app/common/transports';
import { CustomersModule } from './customers.module';
import { HttpExceptionFilter } from '@app/common/exceptions';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CustomersModule,
    grpcCustomersClient,
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen();
}
bootstrap();
