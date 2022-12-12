import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { grpcOrdersClient } from '@app/common/transports';
import { OrdersModule } from './orders.module';
import { HttpExceptionFilter } from '@app/common/exceptions';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrdersModule,
    grpcOrdersClient,
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen();
}
bootstrap();
