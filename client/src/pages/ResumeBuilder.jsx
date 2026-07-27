import { useEffect, useRef, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ChevronLeft, ChevronRight, Save } from "lucide-react";

import Stepper from "../components/builder/Stepper";
import BasicInfoStep from "../components/builder/BasicInfoStep";
import EducationStep from "../components/builder/EducationStep";
import ExperienceStep from "../components/builder/ExperienceStep";
import ProjectsStep from "../components/builder/ProjectsStep";
import SkillsStep from "../components/builder/SkillsStep";
import TemplateStep from "../components/builder/TemplateStep";
import Button from "../components/Button";

import resumeService from "../services/resumeService";
import { exportNodeToPDF } from "../utils/pdfExport";

const steps = ["Basic Info", "Education", "Experience", "Projects", "Skills", "Template & Export"];

const defaultValues = {
  title: "",
  template: "modern",
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    portfolio: "",
    summary: "",
  },
  education: [],
  experience: [],
  projects: [],
  skills: "",
  certifications: "",
};


const toFormValues = (resume) => ({
  title: resume.title || "",
  template: resume.template || "modern",
  personalInfo: { ...defaultValues.personalInfo, ...resume.personalInfo },
  education: resume.education || [],
  experience: resume.experience || [],
  projects: (resume.projects || []).map((p) => ({ ...p, techStack: (p.techStack || []).join(", ") })),
  skills: (resume.skills || []).join(", "),
  certifications: (resume.certifications || []).join(", "),
});

const toApiPayload = (formValues) => ({
  ...formValues,
  skills: splitCommaList(formValues.skills),
  certifications: splitCommaList(formValues.certifications),
  projects: formValues.projects.map((p) => ({ ...p, techStack: splitCommaList(p.techStack) })),
});

const splitCommaList = (value) =>
  (value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const ResumeBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const previewRef = useRef(null);

  const [currentStep, setCurrentStep] = useState(0);
  const [resumeId, setResumeId] = useState(id || null);
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    trigger,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues });

  useEffect(() => {
    if (!id) return;

    const fetchResume = async () => {
      try {
        const { resume } = await resumeService.getResumeById(id);
        reset(toFormValues(resume));
      } catch (error) {
        toast.error("Could not load this resume");
        navigate("/history");
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [id, reset, navigate]);

  const saveResume = useCallback(
    async (formValues) => {
      setSaving(true);
      try {
        const payload = toApiPayload(formValues);

        if (resumeId) {
          await resumeService.updateResume(resumeId, payload);
        } else {
          const { resume } = await resumeService.createResume(payload);
          setResumeId(resume._id);
          navigate(`/builder/${resume._id}`, { replace: true });
        }
        toast.success("Saved");
      } catch (error) {
        toast.error(error.response?.data?.message || "Could not save resume");
      } finally {
        setSaving(false);
      }
    },
    [resumeId, navigate]
  );

  const handleNext = async () => {
    if (currentStep === 0) {
      const valid = await trigger(["title", "personalInfo.fullName", "personalInfo.email"]);
      if (!valid) return;
    }
    await handleSubmit(saveResume)();
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleDownload = async () => {
    if (!previewRef.current) return;
    setDownloading(true);
    try {
      const fileName = (watch("title") || "resume").replace(/\s+/g, "-").toLowerCase();
      await exportNodeToPDF(previewRef.current, fileName);
    } catch (error) {
      toast.error("Could not generate PDF");
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return <p className="text-sm text-ink500/50 dark:text-slate-500">Loading resume...</p>;
  }

  const formValues = watch();
  const previewData = toApiPayload(formValues);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-ink500 dark:text-slate-100">
          {resumeId ? "Edit resume" : "Build a resume"}
        </h1>
        <Button variant="secondary" size="sm" onClick={handleSubmit(saveResume)} loading={saving}>
          <Save className="h-4 w-4" /> Save draft
        </Button>
      </div>

      <Stepper steps={steps} currentStep={currentStep} onStepClick={setCurrentStep} />

      <div className="rounded-2xl border border-ink-800/8 bg-paper-card p-6 dark:border-white/8 dark:bg-ink-900">
        {currentStep === 0 && <BasicInfoStep register={register} errors={errors} />}
        {currentStep === 1 && <EducationStep control={control} register={register} errors={errors} />}
        {currentStep === 2 && (
          <ExperienceStep control={control} register={register} errors={errors} watch={watch} />
        )}
        {currentStep === 3 && <ProjectsStep control={control} register={register} errors={errors} />}
        {currentStep === 4 && <SkillsStep register={register} />}
        {currentStep === 5 && (
          <TemplateStep
            template={watch("template")}
            onTemplateChange={(value) => setValue("template", value, { shouldDirty: true })}
            previewData={previewData}
            previewRef={previewRef}
            onDownload={handleDownload}
            downloading={downloading}
          />
        )}
      </div>

      <div className="mt-6 flex justify-between">
        <Button variant="secondary" onClick={handleBack} disabled={currentStep === 0}>
          <ChevronLeft className="h-4 w-4" /> Back
        </Button>

        {currentStep < steps.length - 1 && (
          <Button onClick={handleNext} loading={saving}>
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ResumeBuilder;
