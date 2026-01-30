import { ConfigService } from '@nestjs/config';
import { WakatimeService } from '../wakatime.service';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Environment } from 'src/interfaces/environment.interface';
import { AxiosResponse } from 'axios';

import {
  HttpStatus,
  InternalServerErrorException,
  HttpException,
} from '@nestjs/common';
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

  it('should throw HttpException when upstream API returns error', async () => {
    const errorResponse = {
      response: {
        data: { message: 'Too Many Requests' },
        status: HttpStatus.TOO_MANY_REQUESTS,
      },
      message: 'Too Many Requests',
    };

    jest
      .spyOn(httpService, 'get')
      .mockReturnValue(throwError(() => errorResponse) as any);

    await expect(wakatimeService.getLastSevenDaysMyStats()).rejects.toThrow(
      HttpException,
    );
  });

  it('should throw InternalServerErrorException on unknown error', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockReturnValue(throwError(() => new Error('Unknown')) as any);

    await expect(wakatimeService.getLastSevenDaysMyStats()).rejects.toThrow(
      InternalServerErrorException,
    );
  });

  it('should throw HttpException with default message when upstream API returns empty error data', async () => {
    const errorResponse = {
      response: {
        data: null,
        status: HttpStatus.BAD_REQUEST,
      },
      message: 'Bad Request',
    };

    jest
      .spyOn(httpService, 'get')
      .mockReturnValue(throwError(() => errorResponse) as any);

    await expect(wakatimeService.getLastSevenDaysMyStats()).rejects.toThrow(
      HttpException,
    );

    try {
      await wakatimeService.getLastSevenDaysMyStats();
    } catch (error) {
      expect(error.response).toBe('Error fetching data from WakaTime');
    }
  });
});
