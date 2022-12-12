import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { grpcProductsClient } from '@app/common/transports';
import { ProductsModule } from './products.module';
import { HttpExceptionFilter } from '@app/common/exceptions';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProductsModule,
    grpcProductsClient,
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen();
}
bootstrap();
