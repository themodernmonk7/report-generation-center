import type { JobStatus } from '../types';
import {
  FileText,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Clock,
} from 'lucide-react';

export const getStatusColor = (status: JobStatus) => {
  switch (status) {
    case 'completed':
      return 'text-emerald-500';
    case 'failed':
      return 'text-rose-500';
    case 'active':
      return 'text-blue-500';
    default:
      return 'text-slate-400';
  }
};

export const getStatusIcon = (status: JobStatus, isLoading: boolean) => {
  if (isLoading)
    return <Loader2 className="w-6 h-6 animate-spin text-blue-500" />;

  switch (status) {
    case 'completed':
      return <CheckCircle2 className="w-8 h-8 text-emerald-500" />;
    case 'failed':
      return <AlertCircle className="w-8 h-8 text-rose-500" />;
    case 'active':
      return <Loader2 className="w-8 h-8 animate-spin text-blue-500" />;
    case 'waiting':
      return <Clock className="w-8 h-8 animate-pulse text-amber-500" />;
    default:
      return <FileText className="w-12 h-12 text-slate-300" />;
  }
};
