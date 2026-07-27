import { FileText } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-paper dark:bg-ink-950">
      <div className="flex flex-col items-center gap-3">
        <div className="flex h-12 w-12 animate-pulse items-center justify-center rounded-2xl bg-navy-600 dark:bg-gold-500">
          <FileText className="h-6 w-6 text-white dark:text-ink-950" />
        </div>
        <span className="text-sm text-ink500/60 dark:text-slate-400">Loading...</span>
      </div>
    </div>
  );
};

export default PageLoader;
