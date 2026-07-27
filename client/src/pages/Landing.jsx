import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileStack, ScanSearch, Sparkles, ArrowRight } from "lucide-react";
import ScoreSeal from "../components/ScoreSeal";
import Button from "../components/Button";

const features = [
  {
    icon: FileStack,
    title: "Guided resume builder",
    description: "A step-by-step wizard with live preview and templates that don't look templated.",
  },
  {
    icon: ScanSearch,
    title: "Real ATS scoring",
    description: "See exactly how applicant tracking systems read your resume before a recruiter does.",
  },
  {
    icon: Sparkles,
    title: "Job description matching",
    description: "Paste a job post and find out which keywords and skills you're missing.",
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-600 dark:bg-gold-500">
            <FileStack className="h-4 w-4 text-white dark:text-ink-950" />
          </div>
          <span className="font-display text-lg font-semibold text-ink500 dark:text-slate-100">
            ResuMind
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm font-medium text-ink500/70 dark:text-slate-300">
            Log in
          </Link>
          <Link to="/signup">
            <Button size="sm">Get started</Button>
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="mb-4 inline-block rounded-full bg-navy-600/8 px-3 py-1 text-xs font-medium text-navy-600 dark:bg-gold-500/10 dark:text-gold-400">
            Built for job applications that actually land
          </span>
          <h1 className="mb-5 font-display text-4xl font-semibold leading-tight text-ink500 dark:text-slate-100 md:text-5xl">
            Resumes reviewed like a hiring manager would, before a bot rejects them.
          </h1>
          <p className="mb-8 max-w-md text-base text-ink500/60 dark:text-slate-400">
            Build a resume from scratch or upload what you have, then get an ATS score, missing
            keywords, and line-by-line suggestions — grounded in the job you're actually applying to.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/signup">
              <Button size="lg">
                Build my resume <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login" className="text-sm font-medium text-ink500/70 dark:text-slate-300">
              I already have an account
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="flex justify-center"
        >
          <div className="flex items-center gap-8 rounded-2xl border border-ink-800/8 bg-paper-card p-8 shadow-card dark:border-white/8 dark:bg-ink-900">
            <ScoreSeal score={87} size={128} label="ATS Score" />
            <div className="flex flex-col gap-3 text-sm">
              <KeywordChip label="React" matched />
              <KeywordChip label="Node.js" matched />
              <KeywordChip label="System design" />
              <KeywordChip label="Docker" />
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-ink-800/8 bg-paper-card p-6 dark:border-white/8 dark:bg-ink-900"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-navy-600/10 dark:bg-gold-500/10">
                <Icon className="h-5 w-5 text-navy-600 dark:text-gold-400" />
              </div>
              <h3 className="mb-2 font-display text-lg font-semibold text-ink500 dark:text-slate-100">
                {title}
              </h3>
              <p className="text-sm text-ink500/60 dark:text-slate-400">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-ink-800/8 px-6 py-8 text-center text-sm text-ink500/50 dark:border-white/8 dark:text-slate-500">
         Built with the MERN stack by Shambhavi Rai.
      </footer>
    </div>
  );
};

const KeywordChip = ({ label, matched }) => (
  <span
    className={`rounded-full px-3 py-1 text-xs font-medium ${
      matched
        ? "bg-navy-600/10 text-navy-600 dark:bg-gold-500/10 dark:text-gold-400"
        : "bg-ink-800/6 text-ink500/50 dark:bg-white/6 dark:text-slate-500 line-through"
    }`}
  >
    {label}
  </span>
);

export default Landing;
