import { useRef } from "react";
import clsx from "clsx";
import { FileText, Upload } from "lucide-react";

const ResumePicker = ({ resumes, selectedId, onSelect, onUpload, uploading }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) onUpload(file);
    e.target.value = ""; 
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-ink500 dark:text-slate-200">1. Choose a resume</h2>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-1.5 text-sm font-medium text-navy-600 disabled:opacity-50 dark:text-gold-400"
        >
          <Upload className="h-3.5 w-3.5" />
          {uploading ? "Uploading..." : "Upload a resume"}
        </button>
        <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileChange} />
      </div>

      {resumes.length === 0 ? (
        <p className="rounded-xl border border-dashed border-ink-800/15 p-4 text-sm text-ink500/50 dark:border-white/15 dark:text-slate-500">
          No resumes yet — upload one above, or build one in the Resume Builder first.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {resumes.map((resume) => (
            <button
              key={resume._id}
              type="button"
              onClick={() => onSelect(resume._id)}
              className={clsx(
                "flex items-center gap-3 rounded-xl border p-3 text-left transition-colors",
                selectedId === resume._id
                  ? "border-navy-600 bg-navy-600/8 dark:border-gold-400 dark:bg-gold-500/10"
                  : "border-ink-800/10 hover:bg-ink-800/5 dark:border-white/10 dark:hover:bg-white/5"
              )}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-navy-600/10 dark:bg-gold-500/10">
                <FileText className="h-4 w-4 text-navy-600 dark:text-gold-400" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink500 dark:text-slate-100">{resume.title}</p>
                <p className="text-xs capitalize text-ink500/50 dark:text-slate-500">{resume.sourceType}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumePicker;
