import { DocumentBuilder } from '@nestjs/swagger';
import Swagger from '../swagger';

describe(`${Swagger.name}`, () => {
  let swagger: Swagger;

  beforeEach(() => {
    swagger = new Swagger();
  });

  it(`should return a #${DocumentBuilder.name} instance`, () => {
    const documentBuilder = swagger.config();

    expect(documentBuilder).toBeDefined();
  });

  it(`should return a #${DocumentBuilder.name} instance with the correct informations about my API`, () => {
    const documentBuilder = swagger.config();

    expect(documentBuilder.info.title).toBe('API - Felipe André');
    expect(documentBuilder.info.description).toBe(
      'Rotas utilizadas para o desenvolvimento do meu portfólio',
    );
    expect(documentBuilder.info.version).toBe('1.0');
  });
});
