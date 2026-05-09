import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { BullModule } from '@nestjs/bullmq';
import { ReportsProcessor } from './reports.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'report-queue',
    }),
  ],
  controllers: [ReportsController],
  providers: [ReportsService, ReportsProcessor],
})
export class ReportsModule {}
