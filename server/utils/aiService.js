const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const MODEL = "gemini-flash-latest";


const callAI = async (systemPrompt, userPrompt) => {
  const response = await ai.models.generateContent({
    model: MODEL,
    contents: userPrompt,
    config: {
      systemInstruction: systemPrompt,
      responseMimeType: "application/json",
      temperature: 0.4,
    },
  });

  return JSON.parse(response.text);
};

const ANALYSIS_SYSTEM_PROMPT = `You are an expert ATS (Applicant Tracking System) and resume reviewer with years of experience in technical recruiting.
Analyze the given resume text and return STRICT JSON only, matching this exact shape:
{
  "atsScore": number (0-100),
  "matchScore": number or null (0-100, only if a job description was provided),
  "matchedKeywords": string[],
  "missingKeywords": string[],
  "grammarSuggestions": [{ "issue": string, "suggestion": string }],
  "improvementSuggestions": string[],
  "skillGaps": string[],
  "strengths": string[],
  "summary": string (2-3 sentence overall verdict)
}
Be specific and actionable. Do not include markdown, only raw JSON.`;


const analyzeResume = async (resumeText, jobDescriptionText = null) => {
  const userPrompt = jobDescriptionText
    ? `RESUME:\n${resumeText}\n\nJOB DESCRIPTION:\n${jobDescriptionText}\n\nAnalyze the resume against this job description.`
    : `RESUME:\n${resumeText}\n\nNo job description provided - give a general ATS and quality analysis.`;

  return callAI(ANALYSIS_SYSTEM_PROMPT, userPrompt);
};

const SUMMARY_SYSTEM_PROMPT = `You are a professional resume writer. Given rough career details, write a crisp, impactful 2-3 sentence
professional summary for a resume. Return STRICT JSON only: { "summary": string }`;


const generateSummary = async (details) => {
  return callAI(SUMMARY_SYSTEM_PROMPT, JSON.stringify(details));
};

module.exports = { analyzeResume, generateSummary };
