const asyncHandler = require("express-async-handler");
const Resume = require("../models/Resume");
const Analysis = require("../models/Analysis");
const JobDescription = require("../models/JobDescription");
const { analyzeResume } = require("../utils/aiService");


const buildResumeText = (resume) => {
  if (resume.sourceType === "upload") {
    return resume.uploadedFile.extractedText;
  }

  const { personalInfo, education, experience, projects, skills, certifications } = resume;

  const educationText = education
    .map((e) => `${e.degree} in ${e.fieldOfStudy} - ${e.institution} (${e.startYear}-${e.endYear})`)
    .join("\n");

  const experienceText = experience
    .map((e) => `${e.role} at ${e.company} (${e.startDate}-${e.current ? "Present" : e.endDate})\n${e.description}`)
    .join("\n\n");

  const projectsText = projects
    .map((p) => `${p.title}: ${p.description} [${p.techStack.join(", ")}]`)
    .join("\n");

  return `
SUMMARY: ${personalInfo.summary}

EDUCATION:
${educationText}

EXPERIENCE:
${experienceText}

PROJECTS:
${projectsText}

SKILLS: ${skills.join(", ")}

CERTIFICATIONS: ${certifications.join(", ")}
  `.trim();
};


const runAnalysis = asyncHandler(async (req, res) => {
  const resume = await Resume.findOne({ _id: req.params.resumeId, user: req.user._id });

  if (!resume) {
    res.status(404);
    throw new Error("Resume not found");
  }

  const resumeText = buildResumeText(resume);

  if (!resumeText || resumeText.trim().length < 20) {
    res.status(400);
    throw new Error("Resume does not have enough content to analyze");
  }

  let jobDescriptionDoc = null;
  let jdText = null;

  if (req.body.jobDescriptionId) {
    jobDescriptionDoc = await JobDescription.findOne({
      _id: req.body.jobDescriptionId,
      user: req.user._id,
    });
    jdText = jobDescriptionDoc?.rawText || null;
  } else if (req.body.jobDescriptionText) {
    jdText = req.body.jobDescriptionText;
  }

  const result = await analyzeResume(resumeText, jdText);

  const analysis = await Analysis.create({
    user: req.user._id,
    resume: resume._id,
    jobDescription: jobDescriptionDoc?._id || null,
    atsScore: result.atsScore,
    matchScore: result.matchScore,
    missingKeywords: result.missingKeywords || [],
    matchedKeywords: result.matchedKeywords || [],
    grammarSuggestions: result.grammarSuggestions || [],
    improvementSuggestions: result.improvementSuggestions || [],
    skillGaps: result.skillGaps || [],
    strengths: result.strengths || [],
    summary: result.summary || "",
  });

  res.status(201).json({ success: true, analysis });
});


const getAnalysesForResume = asyncHandler(async (req, res) => {
  const analyses = await Analysis.find({
    resume: req.params.resumeId,
    user: req.user._id,
  }).sort({ createdAt: -1 });

  res.status(200).json({ success: true, count: analyses.length, analyses });
});



const getAnalysisById = asyncHandler(async (req, res) => {
  const analysis = await Analysis.findOne({
    _id: req.params.analysisId,
    user: req.user._id,
  }).populate("jobDescription", "title company");

  if (!analysis) {
    res.status(404);
    throw new Error("Analysis not found");
  }

  res.status(200).json({ success: true, analysis });
});



const saveJobDescription = asyncHandler(async (req, res) => {
  const { title, company, rawText } = req.body;

  const jobDescription = await JobDescription.create({
    user: req.user._id,
    title,
    company,
    rawText,
  });

  res.status(201).json({ success: true, jobDescription });
});



const getJobDescriptions = asyncHandler(async (req, res) => {
  const jobDescriptions = await JobDescription.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.status(200).json({ success: true, jobDescriptions });
});

module.exports = {
  runAnalysis,
  getAnalysesForResume,
  getAnalysisById,
  saveJobDescription,
  getJobDescriptions,
};
