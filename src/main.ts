import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Similar to app.js file in a node-express app
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
