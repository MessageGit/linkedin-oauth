import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');

  await app.listen(port, '0.0.0.0');
  console.log(`\n\n\x1b[34m🚀 Server is now available at the \x1b[37m${await app.getUrl()}\x1b[34m address!\x1b[0m`);
}

bootstrap();
