import clsx from "clsx";
import { Check } from "lucide-react";

const Stepper = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className="mb-8 flex items-center">
      {steps.map((label, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <button
              type="button"
              onClick={() => onStepClick(index)}
              disabled={index > currentStep}
              className="flex flex-col items-center gap-2 disabled:cursor-not-allowed"
            >
              <span
                className={clsx(
                  "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                  isCompleted && "bg-navy-600 text-white dark:bg-gold-500 dark:text-ink-950",
                  isActive && "border-2 border-navy-600 text-navy-600 dark:border-gold-400 dark:text-gold-400",
                  !isCompleted && !isActive && "border border-ink-800/15 text-ink500/40 dark:border-white/15 dark:text-slate-500"
                )}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
              </span>
              <span
                className={clsx(
                  "hidden text-xs font-medium sm:block",
                  isActive ? "text-ink500 dark:text-slate-100" : "text-ink500/40 dark:text-slate-500"
                )}
              >
                {label}
              </span>
            </button>

            {index < steps.length - 1 && (
              <div
                className={clsx(
                  "mx-2 h-px flex-1",
                  isCompleted ? "bg-navy-600 dark:bg-gold-500" : "bg-ink-800/10 dark:bg-white/10"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
