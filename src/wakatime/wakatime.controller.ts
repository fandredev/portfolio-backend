import { Controller, Get, HttpStatus } from '@nestjs/common';
import { WakatimeService } from './wakatime.service';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('wakatime')
@ApiTags('Wakatime')
export class WakatimeController {
  constructor(private wakatimeService: WakatimeService) {}

  @Get('languages')
  @ApiOperation({
    summary: 'Obter minhas linguagens mais usadas nos ultimos 7 dias.',
    description: 'Retorna as linguagens mais usadas nos últimos 7 dias.',
    tags: ['Wakatime'],
  })
  @ApiOkResponse({
    description:
      'Estatisticas das minhas linguagens dos últimos 7 dias do wakatime obtidas com sucesso.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro ao obter as linguagens do wakatime.',
  })
  async getLanguages(): Promise<any[]> {
    const { languages } = await this.wakatimeService.getLastSevenDaysMyStats();

    return languages.slice(0, 5);
  }

  @Get('editors')
  @ApiOperation({
    summary: 'Obter meus editores mais usados e preferidos nos últimos 7 dias.',
    description: 'Retorna os editores mais usados nos últimos 7 dias.',
    tags: ['Wakatime'],
  })
  @ApiOkResponse({
    description:
      'Estatisticas do(s) editores que mais utilizo da API do WakaTime.',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro ao obter meus editores preferidos da API do WakaTime.',
  })
  async getEditors(): Promise<any[]> {
    const { editors } = await this.wakatimeService.getLastSevenDaysMyStats();

    return editors;
  }
}
