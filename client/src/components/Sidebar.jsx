import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { LayoutDashboard, FileText, ScanSearch, History, User, FileStack } from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/builder", label: "Resume Builder", icon: FileText },
  { to: "/analyzer", label: "Analyzer", icon: ScanSearch },
  { to: "/history", label: "History", icon: History },
  { to: "/profile", label: "Profile", icon: User },
];

const Sidebar = () => {
  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-ink-800/8 bg-paper-card px-4 py-6 dark:border-white/8 dark:bg-ink-900 md:flex">
      <div className="mb-8 flex items-center gap-2 px-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-600 dark:bg-gold-500">
          <FileStack className="h-4 w-4 text-white dark:text-ink-950" />
        </div>
        <span className="font-display text-lg font-semibold text-ink500 dark:text-slate-100">
          ResuMind
        </span>
      </div>

      <nav className="flex flex-col gap-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-navy-600/10 text-navy-600 dark:bg-gold-500/10 dark:text-gold-400"
                  : "text-ink500/70 hover:bg-ink-800/6 dark:text-slate-400 dark:hover:bg-white/6"
              )
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
