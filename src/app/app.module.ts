import { Module } from '@nestjs/common';
import { WakatimeModule } from 'src/wakatime/wakatime.module';
import { ConfigModule } from '@nestjs/config';

import * as Joi from 'joi';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        WAKATIME_BASE_API_URL: Joi.string().required(),
        WAKATIME_API_KEY: Joi.string().required(),
        WAKATIME_AUTHORIZATION: Joi.string().required(),
      }),
    }),
    WakatimeModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
  ],
})
export class AppModule {}
