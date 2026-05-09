import { useState, useEffect, useCallback } from 'react';
import { Download, RefreshCcw, BarChart3 } from 'lucide-react';
import type { JobResult, JobStatus, StatusResponse } from './types';
import { API_BASE_URL, POLLING_INTERVAL } from './constants';
import { API_ENDPOINTS } from './services/api-resources';
import { getStatusColor, getStatusIcon } from './utils';
import { Footer, Header, Stats } from './components';

function App() {
  const [jobId, setJobId] = useState<string | null>(null);
  const [status, setStatus] = useState<JobStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<JobResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const pollStatus = useCallback(async (id: string) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/${API_ENDPOINTS.GET_STATUS(id)}`,
      );
      if (!response.ok) throw new Error('Failed to fetch status');

      const data: StatusResponse = await response.json();

      setStatus(data.status);
      setProgress(data.progress);

      if (data.status === 'completed' && data.result) {
        setResult(data.result);
        setJobId(null); // Stop polling
      } else if (data.status === 'failed') {
        setError(data.failedReason || 'Generation failed');
        setJobId(null); // Stop polling
      }
    } catch (err) {
      console.error('Polling error:', err);
      setError('Connection lost. Retrying...');
    }
  }, []);

  useEffect(() => {
    let interval: number | undefined;

    if (jobId) {
      interval = setInterval(() => pollStatus(jobId), POLLING_INTERVAL);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [jobId, pollStatus]);

  const generateReport = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setProgress(0);

    try {
      const response = await fetch(
        `${API_BASE_URL}/${API_ENDPOINTS.GENERATE_REPORT}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            reportName: 'Monthly Sales Report',
          }),
        },
      );

      if (!response.ok) throw new Error('Failed to start generation');

      const data = await response.json();
      setJobId(data.jobId);
      setStatus('waiting');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setStatus('failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-blue-500/30">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      <main className="relative max-w-4xl mx-auto px-6 py-20">
        <Header />
        <div className="grid gap-8">
          <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative flex flex-col items-center justify-center min-h-[300px]">
              <div className="mb-6 transition-transform duration-500 transform group-hover:scale-110">
                {getStatusIcon(status, isLoading)}
              </div>

              {status === 'idle' && !isLoading && (
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">Ready to Start</h3>
                  <p className="text-slate-400 mb-8">
                    Generate a comprehensive sales and performance report.
                  </p>
                  <button
                    onClick={generateReport}
                    disabled={isLoading}
                    className="px-8 py-4 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-semibold rounded-2xl transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2 mx-auto"
                  >
                    <BarChart3 className="w-5 h-5" />
                    Generate Report
                  </button>
                </div>
              )}

              {(status === 'waiting' || status === 'active') && (
                <div className="w-full max-w-md text-center">
                  <h3 className="text-xl font-semibold mb-2">
                    {status === 'waiting'
                      ? 'Waiting in Queue...'
                      : 'Processing Data...'}
                  </h3>
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2 px-1">
                      <span className={getStatusColor(status)}>
                        {status.toUpperCase()}
                      </span>
                      <span className="text-slate-400 font-mono">
                        {progress}%
                      </span>
                    </div>
                    <div className="h-3 w-full bg-slate-700/50 rounded-full overflow-hidden border border-slate-600/30">
                      <div
                        className="h-full bg-linear-to-r from-blue-600 to-indigo-500 rounded-full transition-all duration-500 ease-out shadow-[0_0_12px_rgba(37,99,235,0.4)]"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                  <p className="text-slate-500 text-sm animate-pulse">
                    Please stay on this page while we compile your report.
                  </p>
                </div>
              )}

              {status === 'completed' && result && (
                <div className="text-center animate-in fade-in zoom-in duration-500">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Report Ready!
                  </h3>
                  <p className="text-slate-400 mb-8">
                    Generated successfully:{' '}
                    <span className="font-mono text-blue-400">
                      {result.fileName}
                    </span>
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href={result.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-semibold rounded-2xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      Download Report
                    </a>
                    <button
                      onClick={() => setStatus('idle')}
                      className="px-8 py-4 bg-slate-700 hover:bg-slate-600 active:scale-95 text-white font-semibold rounded-2xl transition-all border border-slate-600 flex items-center justify-center gap-2"
                    >
                      <RefreshCcw className="w-5 h-5" />
                      Start New
                    </button>
                  </div>
                </div>
              )}

              {status === 'failed' && (
                <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h3 className="text-xl font-bold text-rose-400 mb-2">
                    Generation Failed
                  </h3>
                  <p className="text-slate-400 mb-8">
                    {error || 'Something went wrong during processing.'}
                  </p>
                  <button
                    onClick={generateReport}
                    className="px-8 py-4 bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-semibold rounded-2xl transition-all shadow-lg shadow-rose-500/20 flex items-center gap-2 mx-auto"
                  >
                    <RefreshCcw className="w-5 h-5" />
                    Try Again
                  </button>
                </div>
              )}
            </div>
          </div>
          <Stats />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
