import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const isProd = process.env.MODE === 'production';

  const app = await NestFactory
    .create<NestExpressApplication>(AppModule, { cors: true });

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: isProd }));

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((e) => console.error('Error starting application. ', e));
