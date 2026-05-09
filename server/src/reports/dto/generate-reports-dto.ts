import { IsString } from 'class-validator';

export class GenerateReportDto {
  @IsString()
  reportName: string;
}
