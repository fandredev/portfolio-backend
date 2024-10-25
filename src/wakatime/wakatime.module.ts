import { Module } from '@nestjs/common';
import { WakatimeService } from './wakatime.service';
import { WakatimeController } from './wakatime.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [WakatimeService],
  controllers: [WakatimeController],
})
export class WakatimeModule {}
