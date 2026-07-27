import FormTextarea from "../FormTextarea";

const SkillsStep = ({ register }) => {
  return (
    <div className="flex flex-col gap-5">
      <FormTextarea
        label="Skills"
        placeholder="e.g. HTML, JavaScript, React, MongoDB, (comma-separated)"
        rows={3}
        {...register("skills")}
      />
      <FormTextarea
        label="Certifications (optional)"
        placeholder="AWS Certified Cloud Practitioner, Meta Frontend Developer (comma-separated)"
        rows={3}
        {...register("certifications")}
      />
    </div>
  );
};

export default SkillsStep;
