import { useState } from "react";
import { Moon, Sun, ChevronDown, LogOut, User as UserIcon } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initials = user?.name
    ?.split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-ink-800/8 bg-paper/80 px-6 backdrop-blur dark:border-white/8 dark:bg-ink-950/80">
      <div />

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="flex h-9 w-9 items-center justify-center rounded-full text-ink500/70 transition-colors hover:bg-ink-800/8 dark:text-slate-300 dark:hover:bg-white/8"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        <div className="relative">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2.5 hover:bg-ink-800/8 dark:hover:bg-white/8"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-600 text-xs font-semibold text-white dark:bg-gold-500 dark:text-ink-950">
              {initials || "U"}
            </span>
            <ChevronDown className="h-3.5 w-3.5 text-ink500/50 dark:text-slate-400" />
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 z-20 mt-2 w-48 rounded-xl border border-ink-800/10 bg-paper-card p-1.5 shadow-card-hover dark:border-white/10 dark:bg-ink-900">
                <p className="truncate px-3 py-2 text-sm font-medium text-ink500 dark:text-slate-100">
                  {user?.name}
                </p>
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink500/80 hover:bg-ink-800/6 dark:text-slate-300 dark:hover:bg-white/6"
                >
                  <UserIcon className="h-4 w-4" /> Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-500 hover:bg-red-500/8"
                >
                  <LogOut className="h-4 w-4" /> Log out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
