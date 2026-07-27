const asyncHandler = require("express-async-handler");
const fs = require("fs");
const Resume = require("../models/Resume");
const { extractTextFromPDF } = require("../utils/pdfParser");


const createResume = asyncHandler(async (req, res) => {
  const resume = await Resume.create({
    ...req.body,
    user: req.user._id,
    sourceType: "builder",
  });

  res.status(201).json({ success: true, resume });
});

const getResumes = asyncHandler(async (req, res) => {
  const resumes = await Resume.find({ user: req.user._id }).sort({ updatedAt: -1 });
  res.status(200).json({ success: true, count: resumes.length, resumes });
});


const getResumeById = asyncHandler(async (req, res) => {
  const resume = await Resume.findOne({ _id: req.params.id, user: req.user._id });

  if (!resume) {
    res.status(404);
    throw new Error("Resume not found");
  }

  res.status(200).json({ success: true, resume });
});


const updateResume = asyncHandler(async (req, res) => {
  const resume = await Resume.findOne({ _id: req.params.id, user: req.user._id });

  if (!resume) {
    res.status(404);
    throw new Error("Resume not found");
  }

  Object.assign(resume, req.body);
  const updated = await resume.save();

  res.status(200).json({ success: true, resume: updated });
});


const deleteResume = asyncHandler(async (req, res) => {
  const resume = await Resume.findOne({ _id: req.params.id, user: req.user._id });

  if (!resume) {
    res.status(404);
    throw new Error("Resume not found");
  }

  if (resume.uploadedFile?.storedPath && fs.existsSync(resume.uploadedFile.storedPath)) {
    fs.unlinkSync(resume.uploadedFile.storedPath);
  }

  await resume.deleteOne();

  res.status(200).json({ success: true, message: "Resume deleted" });
});


const uploadResume = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("No file uploaded");
  }

  let extractedText = "";
  const isPDF = req.file.mimetype === "application/pdf";

  if (isPDF) {
    extractedText = await extractTextFromPDF(req.file.path);
  }

  const resume = await Resume.create({
    user: req.user._id,
    title: req.file.originalname.replace(/\.[^/.]+$/, ""),
    sourceType: "upload",
    uploadedFile: {
      originalName: req.file.originalname,
      storedPath: req.file.path,
      extractedText,
    },
  });

  res.status(201).json({ success: true, resume });
});

module.exports = {
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume,
  uploadResume,
};
