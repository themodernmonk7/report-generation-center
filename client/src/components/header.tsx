const Header = () => {
  return (
    <header className="mb-12 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
        <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">
          Async System Online
        </span>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-b from-white to-slate-400 mb-4 tracking-tight">
        Report Generation Center
      </h1>
      <p className="text-slate-400 max-w-md mx-auto text-lg">
        Trigger heavy data analytics jobs and track progress in real-time.
      </p>
    </header>
  );
};

export default Header;
