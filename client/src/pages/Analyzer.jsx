import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ScanSearch, Clock } from "lucide-react";

import ResumePicker from "../components/analyzer/ResumePicker";
import AnalysisResult from "../components/analyzer/AnalysisResult";
import FormTextarea from "../components/FormTextarea";
import Button from "../components/Button";
import Skeleton from "../components/Skeleton";

import resumeService from "../services/resumeService";
import analysisService from "../services/analysisService";

const Analyzer = () => {
  const [resumes, setResumes] = useState([]);
  const [loadingResumes, setLoadingResumes] = useState(true);
  const [selectedResumeId, setSelectedResumeId] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [jobDescriptionText, setJobDescriptionText] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const [pastAnalyses, setPastAnalyses] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const { resumes } = await resumeService.getResumes();
        setResumes(resumes);
        if (resumes.length > 0) setSelectedResumeId(resumes[0]._id);
      } catch (error) {
        toast.error("Could not load your resumes");
      } finally {
        setLoadingResumes(false);
      }
    };

    fetchResumes();
  }, []);

  useEffect(() => {
    if (!selectedResumeId) {
      setPastAnalyses([]);
      return;
    }

    const fetchHistory = async () => {
      setLoadingHistory(true);
      try {
        const { analyses } = await analysisService.getAnalysesForResume(selectedResumeId);
        setPastAnalyses(analyses);
      } catch (error) {
        
      } finally {
        setLoadingHistory(false);
      }
    };

    fetchHistory();
    setResult(null);
  }, [selectedResumeId]);

  const handleUpload = async (file) => {
    setUploading(true);
    try {
      const { resume } = await resumeService.uploadResume(file);
      setResumes((prev) => [resume, ...prev]);
      setSelectedResumeId(resume._id);
      toast.success("Resume uploaded");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not upload resume");
    } finally {
      setUploading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedResumeId) {
      toast.error("Pick a resume first");
      return;
    }

    setAnalyzing(true);
    try {
      const { analysis } = await analysisService.runAnalysis(selectedResumeId, {
        jobDescriptionText: jobDescriptionText.trim() || undefined,
      });
      setResult(analysis);
      setPastAnalyses((prev) => [analysis, ...prev]);
    } catch (error) {
      toast.error(error.response?.data?.message || "Analysis failed — check your OpenAI API key on the backend");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-ink500 dark:text-slate-100">Resume Analyzer</h1>
        <p className="mt-1 text-sm text-ink500/60 dark:text-slate-400">
          Get an ATS score, missing keywords, and improvement suggestions — optionally matched
          against a specific job description.
        </p>
      </div>

      <div className="mb-6 rounded-2xl border border-ink-800/8 bg-paper-card p-6 dark:border-white/8 dark:bg-ink-900">
        {loadingResumes ? (
          <Skeleton className="h-20 w-full" />
        ) : (
          <ResumePicker
            resumes={resumes}
            selectedId={selectedResumeId}
            onSelect={setSelectedResumeId}
            onUpload={handleUpload}
            uploading={uploading}
          />
        )}

        <div className="mt-6">
          <h2 className="mb-3 text-sm font-semibold text-ink500 dark:text-slate-200">
            2. Job description (optional)
          </h2>
          <FormTextarea
            placeholder="Paste the job description here to get a match score and see missing keywords specific to this role"
            rows={5}
            value={jobDescriptionText}
            onChange={(e) => setJobDescriptionText(e.target.value)}
          />
        </div>

        <div className="mt-6">
          <Button onClick={handleAnalyze} loading={analyzing} disabled={!selectedResumeId}>
            <ScanSearch className="h-4 w-4" /> Run analysis
          </Button>
        </div>
      </div>

      {analyzing && (
        <div className="mb-6 flex flex-col gap-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      )}

      {!analyzing && result && (
        <div className="mb-8">
          <AnalysisResult analysis={result} />
        </div>
      )}

      {!loadingHistory && pastAnalyses.length > 0 && (
        <div className="rounded-2xl border border-ink-800/8 bg-paper-card p-6 dark:border-white/8 dark:bg-ink-900">
          <div className="mb-4 flex items-center gap-2">
            <Clock className="h-4 w-4 text-ink500/50 dark:text-slate-500" />
            <h2 className="font-display text-lg font-semibold text-ink500 dark:text-slate-100">
              Past analyses for this resume
            </h2>
          </div>
          <div className="flex flex-col divide-y divide-ink-800/8 dark:divide-white/8">
            {pastAnalyses.map((item) => (
              <button
                key={item._id}
                onClick={() => setResult(item)}
                className="flex items-center justify-between py-3 text-left first:pt-0 last:pb-0 hover:opacity-70"
              >
                <span className="text-sm text-ink500/70 dark:text-slate-400">
                  {new Date(item.createdAt).toLocaleString()}
                </span>
                <span className="rounded-full bg-navy-600/10 px-2.5 py-1 text-xs font-medium text-navy-600 dark:bg-gold-500/10 dark:text-gold-400">
                  ATS {item.atsScore}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Analyzer;
