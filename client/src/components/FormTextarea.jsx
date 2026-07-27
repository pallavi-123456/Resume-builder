import { forwardRef } from "react";
import clsx from "clsx";

const FormTextarea = forwardRef(({ label, error, className, rows = 4, ...rest }, ref) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={rest.id || rest.name} className="text-sm font-medium text-ink500 dark:text-slate-200">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={clsx(
          "resize-none rounded-xl border bg-paper-card px-4 py-2.5 text-sm text-ink500 outline-none transition-colors placeholder:text-ink500/40",
          "dark:bg-ink-900 dark:text-slate-100 dark:placeholder:text-slate-500",
          error
            ? "border-red-500 focus:border-red-500"
            : "border-ink-800/15 focus:border-navy-500 dark:border-white/10 dark:focus:border-gold-400",
          className
        )}
        {...rest}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
});

FormTextarea.displayName = "FormTextarea";

export default FormTextarea;
