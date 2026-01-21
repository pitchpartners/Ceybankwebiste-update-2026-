import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import express, { Express } from 'express';
import { toNodeHandler } from 'better-auth/node';
import { AuthService } from '@thallesp/nestjs-better-auth';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  const corsEnv =
    process.env.CROSS_ORIGINS ?? process.env.CROSS_ORIGIN ?? '';
  const origins = corsEnv
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.enableCors({
    origin: origins.length ? origins : true,
    credentials: true,
  });
  const expressApp = app.getHttpAdapter().getInstance() as unknown as Express;
  const authService = app.get<AuthService>(AuthService);
  expressApp.use('/api/auth', toNodeHandler(authService.instance));
  // Re-enable JSON parsing for the rest of the app.
  expressApp.use(express.json());
  expressApp.use(express.urlencoded({ extended: true }));

  // Serve uploaded assets
  const uploadDir = join(__dirname, '..', 'uploads');
  expressApp.use('/uploads', express.static(uploadDir));

  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 8000);
}
void bootstrap();
