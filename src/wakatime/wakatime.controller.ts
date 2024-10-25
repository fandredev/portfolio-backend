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
  getStats() {
    return this.wakatimeService.getLastSevenDaysMyStats();
  }
}
