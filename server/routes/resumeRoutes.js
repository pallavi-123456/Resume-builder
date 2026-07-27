const express = require("express");
const { body } = require("express-validator");
const validate = require("../middleware/validate");
const { protect } = require("../middleware/auth");
const upload = require("../middleware/upload");
const {
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume,
  uploadResume,
} = require("../controllers/resumeController");

const router = express.Router();

router.use(protect);

router.post(
  "/",
  [body("title").optional().trim().notEmpty().withMessage("Title cannot be empty")],
  validate,
  createResume
);

router.get("/", getResumes);
router.post("/upload", upload.single("resumeFile"), uploadResume);
router.get("/:id", getResumeById);
router.put("/:id", updateResume);
router.delete("/:id", deleteResume);

module.exports = router;
