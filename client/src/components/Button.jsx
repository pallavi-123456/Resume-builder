import clsx from "clsx";
import { Loader2 } from "lucide-react";

const variants = {
  primary:
    "bg-navy-600 text-white hover:bg-navy-700 dark:bg-gold-500 dark:text-ink-950 dark:hover:bg-gold-400",
  secondary:
    "bg-transparent border border-ink-800/15 text-ink500 hover:bg-ink-800/5 dark:border-white/15 dark:text-slate-100 dark:hover:bg-white/5",
  ghost: "bg-transparent text-navy-600 hover:bg-navy-600/8 dark:text-gold-400 dark:hover:bg-gold-400/10",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  type = "button",
  className,
  ...rest
}) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        sizes[size],
        className
      )}
      {...rest}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
};

export default Button;
