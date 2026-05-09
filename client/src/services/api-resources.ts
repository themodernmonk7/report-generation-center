export const API_ENDPOINTS = {
  GENERATE_REPORT: 'reports/generate',
  GET_STATUS: (jobId: string) => `reports/${jobId}/status`,
} as const;
