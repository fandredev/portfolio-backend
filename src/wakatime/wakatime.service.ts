import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom, map } from 'rxjs';

import { AxiosError } from 'axios';
import { Language } from './language';
import { Environment } from 'src/interfaces/environment.interface';

@Injectable()
export class WakatimeService {
  private readonly statsLastSevenDays: string;
  private readonly apiKey: string;
  private readonly authorization: string;
  private readonly logger = new Logger(WakatimeService.name);

  constructor(
    private readonly configService: ConfigService<Environment>,
    private readonly httpService: HttpService,
  ) {
    this.statsLastSevenDays = this.configService.get('WAKATIME_BASE_API_URL');
    this.apiKey = this.configService.get('WAKATIME_API_KEY');
    this.authorization = this.configService.get('WAKATIME_AUTHORIZATION');
  }

  async getLastSevenDaysMyStats(): Promise<{ languages: Language[] }> {
    const { data } = await firstValueFrom(
      this.httpService
        .get(`${this.statsLastSevenDays}/users/current/stats/last_7_days`, {
          headers: {
            Authorization: `${this.authorization} ${this.apiKey}`,
          },
        })
        .pipe(
          map((response) => response.data),
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw new InternalServerErrorException(
              'Erro ao obter as estatisticas.',
            );
          }),
        ),
    );

    const languages = {
      languages: data.languages,
    };

    return languages;
  }
}
