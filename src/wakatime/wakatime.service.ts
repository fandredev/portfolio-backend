import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom, map } from 'rxjs';

import { AxiosError } from 'axios';
import { Environment } from 'src/interfaces/environment.interface';
import { WakatimeStatsResponse } from 'src/interfaces/wakatime.interface';

@Injectable()
export class WakatimeService {
  private readonly wakatimeApiUrl: string;
  private readonly apiKey: string;
  private readonly authorization: string;
  private readonly logger = new Logger(WakatimeService.name);

  constructor(
    private readonly configService: ConfigService<Environment>,
    private readonly httpService: HttpService,
  ) {
    this.wakatimeApiUrl = this.configService.get('WAKATIME_BASE_API_URL');
    this.apiKey = this.configService.get('WAKATIME_API_KEY');
    this.authorization = this.configService.get('WAKATIME_AUTHORIZATION');
  }

  async getLastSevenDaysMyStats() {
    const { data } = await firstValueFrom(
      this.httpService
        .get<WakatimeStatsResponse>(
          `${this.wakatimeApiUrl}/users/current/stats/last_7_days`,
          {
            headers: {
              Authorization: `${this.authorization} ${this.apiKey}`,
            },
          },
        )
        .pipe(
          map((response) => response.data),
          catchError((error: AxiosError) => {
            this.logger.error(
              `Error fetching WakaTime stats: ${error.message}`,
              error.response?.data,
            );

            if (error.response) {
              throw new HttpException(
                error.response.data || 'Error fetching data from WakaTime',
                error.response.status,
              );
            }

            throw new InternalServerErrorException(
              'Erro ao obter as estatisticas.',
            );
          }),
        ),
    );

    return {
      languages: data.languages,
      editors: data.editors,
    };
  }
}
