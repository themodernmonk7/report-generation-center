import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { GenerateReportDto } from './dto/generate-reports-dto';

@Injectable()
export class ReportsService {
  constructor(@InjectQueue('report-queue') private reportQueue: Queue) {}

  async generateReport(generateReportDto: GenerateReportDto) {
    const job = await this.reportQueue.add(
      'generate-report',
      {
        reportName: generateReportDto.reportName,
      },
      {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
        removeOnComplete: 100,
        removeOnFail: 100,
      },
    );

    return {
      message: 'Report generate started',
      jobId: job.id,
    };
  }

  async getJobStatus(jobId: string) {
    const job = await this.reportQueue.getJob(jobId);

    if (!job) {
      return {
        status: 'NOT_FOUND',
        result: null,
        failedReason: 'Job not found',
      };
    }

    const state = await job.getState();

    return {
      jobId: job.id,
      status: state,
      progress: job.progress,
      result: (state === 'completed' ? job.returnvalue : null) as {
        downloadUrl: string;
        fileName: string;
      } | null,
      failedReason: state === 'failed' ? job.failedReason : null,
    };
  }
}
