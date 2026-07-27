import { useFieldArray } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import FormInput from "../FormInput";
import FormTextarea from "../FormTextarea";
import Button from "../Button";

const emptyExperience = {
  company: "",
  role: "",
  startDate: "",
  endDate: "",
  current: false,
  description: "",
};

const ExperienceStep = ({ control, register, errors, watch }) => {
  const { fields, append, remove } = useFieldArray({ control, name: "experience" });

  return (
    <div className="flex flex-col gap-5">
      {fields.length === 0 && (
        <p className="text-sm text-ink500/50 dark:text-slate-500">
          No experience added yet — skip this step if you're a fresher.
        </p>
      )}

      {fields.map((field, index) => {
        const isCurrent = watch(`experience.${index}.current`);

        return (
          <div key={field.id} className="rounded-xl border border-ink-800/10 p-4 dark:border-white/10">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-ink500/50 dark:text-slate-500">
                Experience {index + 1}
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
                label="Company"
                error={errors.experience?.[index]?.company?.message}
                {...register(`experience.${index}.company`, { required: "Required" })}
              />
              <FormInput
                label="Role"
                error={errors.experience?.[index]?.role?.message}
                {...register(`experience.${index}.role`, { required: "Required" })}
              />
              <FormInput label="Start date" placeholder="Jan 2025" {...register(`experience.${index}.startDate`)} />
              <FormInput
                label="End date"
                placeholder="Jun 2025"
                disabled={isCurrent}
                {...register(`experience.${index}.endDate`)}
              />
            </div>

            <label className="mt-3 flex items-center gap-2 text-sm text-ink500/70 dark:text-slate-400">
              <input type="checkbox" {...register(`experience.${index}.current`)} className="h-4 w-4 rounded" />
              I currently work here
            </label>

            <div className="mt-4">
              <FormTextarea
                label="Description"
                placeholder="What did you build or improve? Use bullet-style lines."
                rows={3}
                {...register(`experience.${index}.description`)}
              />
            </div>
          </div>
        );
      })}

      <Button type="button" variant="secondary" onClick={() => append(emptyExperience)} className="w-fit">
        <Plus className="h-4 w-4" /> Add experience
      </Button>
    </div>
  );
};

export default ExperienceStep;
