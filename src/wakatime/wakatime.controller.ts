import { Controller, Get, HttpStatus } from '@nestjs/common';
import { WakatimeService } from './wakatime.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('wakatime')
export class WakatimeController {
  constructor(private wakatimeService: WakatimeService) {}

  @Get('languages')
  @ApiOperation({
    summary: 'Obter minhas linguagens mais usadas nos ultimos 7 dias.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'Estatisticas das minhas linguagens dos últimos 7 dias do wakatime obtidas com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro ao obter as linguagens do wakatime.',
  })
  async getLanguages() {
    const { languages } = await this.wakatimeService.getLastSevenDaysMyStats();

    return languages.slice(0, 5);
  }

  @Get('systems')
  @ApiOperation({
    summary: 'Obter meus editores mais usados e preferidos nos últimos 7 dias.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'Estatisticas do(s) editores que mais utilizo da API do WakaTime.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro ao obter meus editores preferidos da API do WakaTime.',
  })
  async getEditors() {
    const { editors } = await this.wakatimeService.getLastSevenDaysMyStats();

    return editors;
  }
}
