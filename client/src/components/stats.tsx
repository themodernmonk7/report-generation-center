import { CheckCircle2, BarChart3, Clock } from 'lucide-react';

const Stats = () => {
  return (
    <div className="grid sm:grid-cols-3 gap-4">
      <div className="bg-slate-800/30 border border-slate-700/50 p-6 rounded-2xl">
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
          <BarChart3 className="w-5 h-5 text-blue-400" />
        </div>
        <h4 className="text-sm font-medium text-slate-300 mb-1">
          Queue Driven
        </h4>
        <p className="text-xs text-slate-500 leading-relaxed">
          Powered by BullMQ for resilient background processing.
        </p>
      </div>
      <div className="bg-slate-800/30 border border-slate-700/50 p-6 rounded-2xl">
        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
          <Clock className="w-5 h-5 text-purple-400" />
        </div>
        <h4 className="text-sm font-medium text-slate-300 mb-1">
          Real-time Polling
        </h4>
        <p className="text-xs text-slate-500 leading-relaxed">
          Live status updates from the worker to your dashboard.
        </p>
      </div>
      <div className="bg-slate-800/30 border border-slate-700/50 p-6 rounded-2xl">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
        </div>
        <h4 className="text-sm font-medium text-slate-300 mb-1">
          Auto Retries
        </h4>
        <p className="text-xs text-slate-500 leading-relaxed">
          Built-in exponential backoff for maximum reliability.
        </p>
      </div>
    </div>
  );
};

export default Stats;
