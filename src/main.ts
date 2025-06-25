import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import { doubleCsrf } from 'csrf-csrf';
import helmet from 'helmet';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const isProd = process.env.MODE === 'production';

  const app = await NestFactory
    .create<NestExpressApplication>(AppModule, { cors: !isProd });

  app.use(helmet({
    crossOriginEmbedderPolicy: isProd,
    crossOriginResourcePolicy: isProd
  }));
  app.use(cookieParser());
  const { doubleCsrfProtection } = doubleCsrf({
    getSecret: (_req) => 'bookstore',
    getSessionIdentifier: (req) => req.ip ?? ''
  });
  app.use(doubleCsrfProtection);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: isProd }));

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((e) => console.error('Error starting application. ', e));
