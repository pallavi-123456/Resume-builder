
const ScoreSeal = ({ score = 0, size = 96, label }) => {
  const color = score >= 75 ? "#C9A227" : score >= 50 ? "#4A6FA5" : "#B3261E";

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="seal-ring flex items-center justify-center rounded-full p-1.5"
        style={{ "--seal-pct": `${score}%`, "--seal-color": color, width: size, height: size }}
      >
        <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-paper-card dark:bg-ink-900">
          <span className="font-display text-2xl font-semibold text-ink500 dark:text-slate-100">
            {score}
          </span>
          <span className="text-[10px] uppercase tracking-wide text-ink500/50 dark:text-slate-400">
            / 100
          </span>
        </div>
      </div>
      {label && <span className="text-xs font-medium text-ink500/70 dark:text-slate-400">{label}</span>}
    </div>
  );
};

export default ScoreSeal;
