import { useFieldArray } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import FormInput from "../FormInput";
import Button from "../Button";

const emptyEducation = {
  institution: "",
  degree: "",
  fieldOfStudy: "",
  startYear: "",
  endYear: "",
  grade: "",
};

const EducationStep = ({ control, register, errors }) => {
  const { fields, append, remove } = useFieldArray({ control, name: "education" });

  return (
    <div className="flex flex-col gap-5">
      {fields.length === 0 && (
        <p className="text-sm text-ink500/50 dark:text-slate-500">No education added yet.</p>
      )}

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="rounded-xl border border-ink-800/10 p-4 dark:border-white/10"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wide text-ink500/50 dark:text-slate-500">
              Education {index + 1}
            </span>
            <button
              type="button"
              onClick={() => remove(index)}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-ink500/40 hover:bg-red-500/10 hover:text-red-500"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormInput
              label="Institution"
              error={errors.education?.[index]?.institution?.message}
              {...register(`education.${index}.institution`, { required: "Required" })}
            />
            <FormInput
              label="Degree"
              error={errors.education?.[index]?.degree?.message}
              {...register(`education.${index}.degree`, { required: "Required" })}
            />
            <FormInput label="Field of study" {...register(`education.${index}.fieldOfStudy`)} />
            <FormInput label="Grade / CGPA" {...register(`education.${index}.grade`)} />
            <FormInput label="Start year" placeholder="2022" {...register(`education.${index}.startYear`)} />
            <FormInput label="End year" placeholder="2026" {...register(`education.${index}.endYear`)} />
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="secondary"
        onClick={() => append(emptyEducation)}
        className="w-fit"
      >
        <Plus className="h-4 w-4" /> Add education
      </Button>
    </div>
  );
};

export default EducationStep;
