import { ConfigService } from '@nestjs/config';
import { WakatimeService } from '../wakatime.service';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Environment } from 'src/interfaces/environment.interface';
import { AxiosResponse } from 'axios';

import { HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { of, throwError } from 'rxjs';

const mockWakatimeStatsConfig = {
  WAKATIME_BASE_API_URL: 'https://api.wakatime.com',
  WAKATIME_API_KEY: 'your-api-key',
  WAKATIME_AUTHORIZATION: 'your-authorization-token',
};

describe(`${WakatimeService.name}`, () => {
  let wakatimeService: WakatimeService;

  let configService: ConfigService<Environment> =
    new ConfigService<Environment>(mockWakatimeStatsConfig);

  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        { provide: ConfigService, useValue: configService },
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    configService = module.get<ConfigService<Environment>>(ConfigService);
    httpService = module.get<HttpService>(HttpService);
    wakatimeService = new WakatimeService(configService, httpService);
  });

  it('services should be defined without errors when services loads', () => {
    expect(configService).toBeDefined();
    expect(httpService).toBeDefined();
    expect(wakatimeService).toBeDefined();
  });

  it('should return all wakatime stats', async () => {
    const responseData = {
      data: {
        languages: [
          {
            name: 'TypeScript',
            total_seconds: 66380.993269,
            percent: 51.16,
            digital: '18:26',
            decimal: '18.43',
            text: '18 hrs 26 mins',
            hours: 18,
            minutes: 26,
          },
        ],
        editors: [
          {
            total_seconds: 129745.284512,
            name: 'VS Code',
            percent: 100.0,
            digital: '36:02',
            decimal: '36.03',
            text: '36 hrs 2 mins',
            hours: 36,
            minutes: 2,
          },
        ],
      },
    };
    const response: AxiosResponse = {
      data: responseData,
      headers: {
        'content-type': 'application/json',
      },
      status: HttpStatus.OK,
      statusText: 'OK',
      config: undefined,
    };

    jest.spyOn(httpService, 'get').mockReturnValue(
      of({
        data: responseData,
        headers: {},
        status: HttpStatus.OK,
        statusText: 'OK',
        config: undefined,
      }),
    );

    const data = await wakatimeService.getLastSevenDaysMyStats();

    expect(data).toEqual({
      languages: response.data.data.languages,
      editors: response.data.data.editors,
    });
  });

  it('should return all wakatime stats with error', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockReturnValue(
        throwError(
          () =>
            new InternalServerErrorException('Erro ao obter as estatisticas.'),
        ) as any,
      );

    await expect(wakatimeService.getLastSevenDaysMyStats()).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
