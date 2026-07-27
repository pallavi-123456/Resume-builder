import api from "./api";

const runAnalysis = async (resumeId, { jobDescriptionText, jobDescriptionId } = {}) => {
  const { data } = await api.post(`/analysis/${resumeId}`, {
    jobDescriptionText,
    jobDescriptionId,
  });
  return data;
};

const getAnalysesForResume = async (resumeId) => {
  const { data } = await api.get(`/analysis/${resumeId}`);
  return data;
};

const getAnalysisById = async (analysisId) => {
  const { data } = await api.get(`/analysis/single/${analysisId}`);
  return data;
};

const saveJobDescription = async ({ title, company, rawText }) => {
  const { data } = await api.post("/analysis/job-description", { title, company, rawText });
  return data;
};

const getJobDescriptions = async () => {
  const { data } = await api.get("/analysis/job-description");
  return data;
};

export default {
  runAnalysis,
  getAnalysesForResume,
  getAnalysisById,
  saveJobDescription,
  getJobDescriptions,
};
