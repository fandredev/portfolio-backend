import { Module } from '@nestjs/common';
import { WakatimeModule } from 'src/wakatime/wakatime.module';
import { ConfigModule } from '@nestjs/config';

import * as Joi from 'joi';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        WAKATIME_BASE_API_URL: Joi.string().required(),
        WAKATIME_API_KEY: Joi.string().required(),
        WAKATIME_AUTHORIZATION: Joi.string().required(),
        APP_PORT: Joi.string().required(),
      }),
    }),
    WakatimeModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 5,
        blockDuration: 5000,
      },
    ]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
