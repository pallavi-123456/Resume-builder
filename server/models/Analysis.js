const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },
    jobDescription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobDescription",
      default: null,
    },
    atsScore: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },
    matchScore: {
      type: Number,
      min: 0,
      max: 100,
      default: null, 
    },
    missingKeywords: [{ type: String }],
    matchedKeywords: [{ type: String }],
    grammarSuggestions: [
      {
        issue: String,
        suggestion: String,
      },
    ],
    improvementSuggestions: [{ type: String }],
    skillGaps: [{ type: String }],
    strengths: [{ type: String }],
    summary: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Analysis", analysisSchema);
