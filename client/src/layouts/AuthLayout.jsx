import { Outlet, Link } from "react-router-dom";
import { FileStack } from "lucide-react";
import { motion } from "framer-motion";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4 dark:bg-ink-950">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Link to="/" className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-600 dark:bg-gold-500">
            <FileStack className="h-4.5 w-4.5 text-white dark:text-ink-950" />
          </div>
          <span className="font-display text-xl font-semibold text-ink500 dark:text-slate-100">
            ResuMind
          </span>
        </Link>

        <div className="rounded-2xl border border-ink-800/8 bg-paper-card p-8 shadow-card dark:border-white/8 dark:bg-ink-900">
          <Outlet />
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
