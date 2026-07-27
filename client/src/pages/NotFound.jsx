import { Link } from "react-router-dom";
import ButtonComponent from "../components/Button";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 text-center dark:bg-ink-950">
      <span className="font-display text-6xl font-semibold text-navy-600 dark:text-gold-400">404</span>
      <h1 className="mt-4 mb-2 text-xl font-semibold text-ink500 dark:text-slate-100">
        This page doesn't exist
      </h1>
      <p className="mb-6 max-w-sm text-sm text-ink500/60 dark:text-slate-400">
        The page you're looking for was moved or never existed.
      </p>
      <Link to="/">
        <ButtonComponent>Go home</ButtonComponent>
      </Link>
    </div>
  );
};

export default NotFound;
