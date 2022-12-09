import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('gRPC Project')
  .setDescription('gRPC Project Api')
  .setVersion('1.0')
  .addTag('Auth')
  .addTag('Users')
  .addTag('Customers')
  .addTag('Categories')
  .addTag('Products')
  .addTag('Orders')
  .addBearerAuth()
  .build();
