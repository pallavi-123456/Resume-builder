import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, FileText, ScanSearch, Clock } from "lucide-react";
import toast from "react-hot-toast";
import Skeleton from "../components/Skeleton";
import Button from "../components/Button";
import resumeService from "../services/resumeService";
import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const { resumes } = await resumeService.getResumes();
        setResumes(resumes);
      } catch (error) {
        toast.error("Could not load your resumes");
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  const firstName = user?.name?.split(" ")[0];

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-ink500 dark:text-slate-100">
            {firstName ? `Welcome back, ${firstName}` : "Welcome back"}
          </h1>
          <p className="mt-1 text-sm text-ink500/60 dark:text-slate-400">
            Here's where your resumes stand.
          </p>
        </div>
        <Link to="/builder">
          <Button>
            <Plus className="h-4 w-4" /> New resume
          </Button>
        </Link>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard icon={FileText} label="Total resumes" value={loading ? null : resumes.length} />
        <StatCard icon={ScanSearch} label="Analyses run" value={loading ? null : "—"} />
        <StatCard icon={Clock} label="Last updated" value={loading ? null : formatLastUpdated(resumes)} />
      </div>

      <div className="rounded-2xl border border-ink-800/8 bg-paper-card p-6 dark:border-white/8 dark:bg-ink-900">
        <h2 className="mb-4 font-display text-lg font-semibold text-ink500 dark:text-slate-100">
          Recent resumes
        </h2>

        {loading ? (
          <div className="flex flex-col gap-3">
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
          </div>
        ) : resumes.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col divide-y divide-ink-800/8 dark:divide-white/8">
            {resumes.slice(0, 5).map((resume) => (
              <Link
                key={resume._id}
                to={`/builder/${resume._id}`}
                className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0 hover:opacity-70"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-600/10 dark:bg-gold-500/10">
                    <FileText className="h-4 w-4 text-navy-600 dark:text-gold-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ink500 dark:text-slate-100">{resume.title}</p>
                    <p className="text-xs text-ink500/50 dark:text-slate-500">
                      Updated {new Date(resume.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-ink-800/6 px-2.5 py-1 text-xs font-medium capitalize text-ink500/60 dark:bg-white/6 dark:text-slate-400">
                  {resume.template || resume.sourceType}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value }) => (
  <div className="rounded-2xl border border-ink-800/8 bg-paper-card p-5 dark:border-white/8 dark:bg-ink-900">
    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-navy-600/10 dark:bg-gold-500/10">
      <Icon className="h-4 w-4 text-navy-600 dark:text-gold-400" />
    </div>
    {value === null ? (
      <Skeleton className="h-7 w-12" />
    ) : (
      <p className="font-display text-2xl font-semibold text-ink500 dark:text-slate-100">{value}</p>
    )}
    <p className="mt-1 text-xs text-ink500/50 dark:text-slate-500">{label}</p>
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center py-10 text-center">
    <FileText className="mb-3 h-8 w-8 text-ink500/30 dark:text-slate-600" />
    <p className="mb-1 text-sm font-medium text-ink500 dark:text-slate-200">No resumes yet</p>
    <p className="mb-4 text-sm text-ink500/50 dark:text-slate-500">
      Build your first resume or upload an existing one to get started.
    </p>
    <Link to="/builder">
      <Button size="sm">
        <Plus className="h-4 w-4" /> Create a resume
      </Button>
    </Link>
  </div>
);

const formatLastUpdated = (resumes) => {
  if (!resumes.length) return "—";
  const latest = resumes.reduce((a, b) => (new Date(a.updatedAt) > new Date(b.updatedAt) ? a : b));
  return new Date(latest.updatedAt).toLocaleDateString();
};

export default Dashboard;
