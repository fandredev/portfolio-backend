import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import Swagger from './common/swagger';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const swagger = new Swagger();

  SwaggerModule.setup(
    swagger.tag,
    app,
    SwaggerModule.createDocument(app, swagger.config()),
  );

  await app.listen(3000);
}
bootstrap();
