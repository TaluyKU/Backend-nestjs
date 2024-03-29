import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'log', 'verbose'],
    cors: true,
  });
  app.use(bodyParser.json({ limit: '50mb' }));
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
