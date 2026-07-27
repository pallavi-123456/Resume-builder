import clsx from "clsx";
import { Download } from "lucide-react";
import Button from "../Button";
import TemplateRenderer from "../templates/TemplateRenderer";

const templateOptions = [
  { value: "minimal", label: "Minimal" },
  { value: "modern", label: "Modern" },
  { value: "classic", label: "Classic" },
  { value: "premium", label: "Premium"},
];

const TemplateStep = ({ template, onTemplateChange, previewData, previewRef, onDownload, downloading }) => {
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-3">
          {templateOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onTemplateChange(option.value)}
              className={clsx(
                "rounded-xl border px-4 py-2 text-sm font-medium transition-colors",
                template === option.value
                  ? "border-navy-600 bg-navy-600/10 text-navy-600 dark:border-gold-400 dark:bg-gold-500/10 dark:text-gold-400"
                  : "border-ink-800/15 text-ink500/60 hover:bg-ink-800/5 dark:border-white/15 dark:text-slate-400 dark:hover:bg-white/5"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>

        <Button onClick={onDownload} loading={downloading}>
          <Download className="h-4 w-4" /> Download PDF
        </Button>
      </div>

      <div className="max-h-[700px] overflow-auto rounded-xl border border-ink-800/10 bg-ink-800/5 p-6 dark:border-white/10 dark:bg-black/20">
        <div ref={previewRef} className="mx-auto shadow-card-hover">
          <TemplateRenderer template={template} data={previewData} />
        </div>
      </div>
    </div>
  );
};

export default TemplateStep;
