const express = require("express");
const { body } = require("express-validator");
const validate = require("../middleware/validate");
const { protect } = require("../middleware/auth");
const {
  runAnalysis,
  getAnalysesForResume,
  getAnalysisById,
  saveJobDescription,
  getJobDescriptions,
} = require("../controllers/analysisController");

const router = express.Router();

router.use(protect);

router.post(
  "/job-description",
  [
    body("title").trim().notEmpty().withMessage("Job title is required"),
    body("rawText").trim().notEmpty().withMessage("Job description text is required"),
  ],
  validate,
  saveJobDescription
);

router.get("/job-description", getJobDescriptions);
router.get("/single/:analysisId", getAnalysisById);
router.post("/:resumeId", runAnalysis);
router.get("/:resumeId", getAnalysesForResume);

module.exports = router;
