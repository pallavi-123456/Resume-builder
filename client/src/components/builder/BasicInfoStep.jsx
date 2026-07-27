import FormInput from "../FormInput";
import FormTextarea from "../FormTextarea";

const BasicInfoStep = ({ register, errors }) => {
  return (
    <div className="flex flex-col gap-5">
      <FormInput
        label="Resume title"
        placeholder="e.g. Frontend Developer Resume"
        error={errors.title?.message}
        {...register("title", { required: "Give your resume a title" })}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormInput
          label="Full name"
          placeholder="Your Name"
          error={errors.personalInfo?.fullName?.message}
          {...register("personalInfo.fullName", { required: "Full name is required" })}
        />
        <FormInput
          label="Email"
          type="email"
          placeholder="you@example.com"
          error={errors.personalInfo?.email?.message}
          {...register("personalInfo.email", { required: "Email is required" })}
        />
        <FormInput label="Phone" placeholder="+91 98XXX XXX10" {...register("personalInfo.phone")} />
        <FormInput label="Location" placeholder="City, Country" {...register("personalInfo.location")} />
        <FormInput label="LinkedIn" placeholder="linkedin.com/in/username" {...register("personalInfo.linkedin")} />
        <FormInput label="GitHub" placeholder="github.com/username" {...register("personalInfo.github")} />
      </div>

      <FormInput
        label="Portfolio (optional)"
        placeholder="yourportfolio.com"
        {...register("personalInfo.portfolio")}
      />

      <FormTextarea
        label="Professional summary"
        placeholder="2-3 sentences on who you are and what you're looking for"
        rows={4}
        {...register("personalInfo.summary")}
      />
    </div>
  );
};

export default BasicInfoStep;
