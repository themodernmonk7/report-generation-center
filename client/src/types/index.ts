export type JobStatus = 'idle' | 'waiting' | 'active' | 'completed' | 'failed';

export interface JobResult {
  downloadUrl: string;
  fileName: string;
}

export interface StatusResponse {
  jobId: string;
  status: JobStatus;
  progress: number;
  result?: JobResult;
  failedReason?: string | null;
}
