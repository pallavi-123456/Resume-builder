import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Trash2, Plus } from "lucide-react";
import toast from "react-hot-toast";
import Skeleton from "../components/Skeleton";
import Button from "../components/Button";
import resumeService from "../services/resumeService";

const History = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const { resumes } = await resumeService.getResumes();
        setResumes(resumes);
      } catch (error) {
        toast.error("Could not load resume history");
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await resumeService.deleteResume(id);
      setResumes((prev) => prev.filter((resume) => resume._id !== id));
      toast.success("Resume deleted");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not delete resume");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-ink500 dark:text-slate-100">Resume history</h1>
          <p className="mt-1 text-sm text-ink500/60 dark:text-slate-400">
            Every resume you've built or uploaded, in one place.
          </p>
        </div>
        <Link to="/builder">
          <Button>
            <Plus className="h-4 w-4" /> New resume
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex flex-col gap-3">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      ) : resumes.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink-800/15 bg-paper-card px-6 py-16 text-center dark:border-white/15 dark:bg-ink-900">
          <FileText className="mx-auto mb-3 h-8 w-8 text-ink500/30 dark:text-slate-600" />
          <p className="text-sm font-medium text-ink500 dark:text-slate-200">No resumes yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resumes.map((resume) => (
            <div
              key={resume._id}
              className="flex flex-col justify-between rounded-2xl border border-ink-800/8 bg-paper-card p-5 dark:border-white/8 dark:bg-ink-900"
            >
              <div>
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-navy-600/10 dark:bg-gold-500/10">
                  <FileText className="h-4 w-4 text-navy-600 dark:text-gold-400" />
                </div>
                <p className="mb-1 truncate text-sm font-medium text-ink500 dark:text-slate-100">
                  {resume.title}
                </p>
                <p className="text-xs text-ink500/50 dark:text-slate-500">
                  Updated {new Date(resume.updatedAt).toLocaleDateString()}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <Link
                  to={`/builder/${resume._id}`}
                  className="text-sm font-medium text-navy-600 dark:text-gold-400"
                >
                  Open
                </Link>
                <button
                  onClick={() => handleDelete(resume._id)}
                  disabled={deletingId === resume._id}
                  aria-label="Delete resume"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-ink500/40 transition-colors hover:bg-red-500/10 hover:text-red-500 disabled:opacity-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
