import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import * as fs from 'fs';
import * as path from 'path';
import { GenerateReportDto } from './dto/generate-reports-dto';

@Processor('report-queue')
export class ReportsProcessor extends WorkerHost {
  async process(job: Job<GenerateReportDto, any, string>): Promise<any> {
    console.log(`Processing Job ${job.id}`);

    const { reportName } = job.data;

    if (Math.random() < 0.2) {
      throw new Error('Random report generation failure');
    }

    // Progress 10%
    await job.updateProgress(10);

    await this.delay(1000);

    // Progress 30%
    await job.updateProgress(30);

    await this.delay(1000);

    // Progress 60%
    await job.updateProgress(60);

    await this.delay(1000);

    // Progress 90%
    await job.updateProgress(90);

    await this.delay(1000);

    const reportsDir = path.join(process.cwd(), 'reports');

    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir);
    }

    const fileName = `report-${job.id}.txt`;

    const filePath = path.join(reportsDir, fileName);

    const reportContent = `
Report Name: ${reportName}
Job ID: ${job.id}
Generated At: ${new Date().toISOString()}

Sales Summary
--------------
Revenue: $50,000
Orders: 1200
Customers: 300
Profit: $12,000
`;

    fs.writeFileSync(filePath, reportContent);

    // Progress 100%
    await job.updateProgress(100);

    console.log(`Completed Job ${job.id}`);

    return {
      downloadUrl: `http://localhost:3000/reports/${fileName}`,
      fileName,
    };
  }

  private async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
