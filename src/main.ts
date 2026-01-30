import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import Swagger from './common/swagger';
import { SwaggerModule } from '@nestjs/swagger';

import helmet from 'helmet';

import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(helmet());
  const configService = app.get(ConfigService);
  const swagger = new Swagger();

  SwaggerModule.setup(
    swagger.tag,
    app,
    SwaggerModule.createDocument(app, swagger.config()),
  );

  await app.listen(configService.get('APP_PORT') || 3000);
}
bootstrap();
