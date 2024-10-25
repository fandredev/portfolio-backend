import { DocumentBuilder } from '@nestjs/swagger';

export default class Swagger {
  public readonly tag = 'api/v1';

  public config() {
    return new DocumentBuilder()
      .setTitle('API - Felipe André')
      .setDescription(
        'Rotas utilizadas para o desenvolvimento do meu portfólio',
      )
      .setVersion('1.0')
      .addTag(this.tag)
      .build();
  }
}
