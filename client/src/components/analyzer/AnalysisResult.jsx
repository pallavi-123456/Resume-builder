import { CheckCircle2, XCircle, AlertTriangle, TrendingUp, Sparkles } from "lucide-react";
import ScoreSeal from "../ScoreSeal";

const AnalysisResult = ({ analysis }) => {
  const {
    atsScore,
    matchScore,
    matchedKeywords = [],
    missingKeywords = [],
    grammarSuggestions = [],
    improvementSuggestions = [],
    skillGaps = [],
    strengths = [],
    summary,
  } = analysis;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-8 rounded-2xl border border-ink-800/8 bg-paper-card p-6 dark:border-white/8 dark:bg-ink-900">
        <ScoreSeal score={atsScore} label="ATS Score" />
        {matchScore !== null && matchScore !== undefined && (
          <ScoreSeal score={matchScore} label="Job Match" />
        )}
        {summary && <p className="max-w-md flex-1 text-sm text-ink500/70 dark:text-slate-400">{summary}</p>}
      </div>

      {(matchedKeywords.length > 0 || missingKeywords.length > 0) && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <KeywordCard title="Matched keywords" icon={CheckCircle2} tone="good" items={matchedKeywords} />
          <KeywordCard title="Missing keywords" icon={XCircle} tone="bad" items={missingKeywords} />
        </div>
      )}

      {skillGaps.length > 0 && (
        <ListCard icon={TrendingUp} title="Skill gaps" items={skillGaps} />
      )}

      {improvementSuggestions.length > 0 && (
        <ListCard icon={Sparkles} title="Improvement suggestions" items={improvementSuggestions} />
      )}

      {grammarSuggestions.length > 0 && (
        <div className="rounded-2xl border border-ink-800/8 bg-paper-card p-6 dark:border-white/8 dark:bg-ink-900">
          <div className="mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-navy-600 dark:text-gold-400" />
            <h3 className="font-display text-lg font-semibold text-ink500 dark:text-slate-100">
              Grammar &amp; wording
            </h3>
          </div>
          <div className="flex flex-col divide-y divide-ink-800/8 dark:divide-white/8">
            {grammarSuggestions.map((item, i) => (
              <div key={i} className="py-3 first:pt-0 last:pb-0">
                <p className="text-sm text-ink500/60 line-through dark:text-slate-500">{item.issue}</p>
                <p className="text-sm text-ink500 dark:text-slate-200">{item.suggestion}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {strengths.length > 0 && (
        <ListCard icon={CheckCircle2} title="Strengths" items={strengths} tone="good" />
      )}
    </div>
  );
};

const KeywordCard = ({ title, icon: Icon, tone, items }) => (
  <div className="rounded-2xl border border-ink-800/8 bg-paper-card p-6 dark:border-white/8 dark:bg-ink-900">
    <div className="mb-3 flex items-center gap-2">
      <Icon className={`h-4 w-4 ${tone === "good" ? "text-navy-600 dark:text-gold-400" : "text-red-500"}`} />
      <h3 className="font-display text-lg font-semibold text-ink500 dark:text-slate-100">{title}</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {items.map((keyword, i) => (
        <span
          key={i}
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            tone === "good"
              ? "bg-navy-600/10 text-navy-600 dark:bg-gold-500/10 dark:text-gold-400"
              : "bg-red-500/10 text-red-500"
          }`}
        >
          {keyword}
        </span>
      ))}
    </div>
  </div>
);

const ListCard = ({ icon: Icon, title, items, tone }) => (
  <div className="rounded-2xl border border-ink-800/8 bg-paper-card p-6 dark:border-white/8 dark:bg-ink-900">
    <div className="mb-3 flex items-center gap-2">
      <Icon className={`h-4 w-4 ${tone === "good" ? "text-navy-600 dark:text-gold-400" : "text-navy-600 dark:text-gold-400"}`} />
      <h3 className="font-display text-lg font-semibold text-ink500 dark:text-slate-100">{title}</h3>
    </div>
    <ul className="flex flex-col gap-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2 text-sm text-ink500/80 dark:text-slate-300">
          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink500/40 dark:bg-slate-500" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default AnalysisResult;
