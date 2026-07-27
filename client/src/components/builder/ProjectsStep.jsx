import { useFieldArray } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import FormInput from "../FormInput";
import FormTextarea from "../FormTextarea";
import Button from "../Button";

const emptyProject = {
  title: "",
  description: "",
  techStack: "", 
  link: "",
};

const ProjectsStep = ({ control, register, errors }) => {
  const { fields, append, remove } = useFieldArray({ control, name: "projects" });

  return (
    <div className="flex flex-col gap-5">
      {fields.length === 0 && (
        <p className="text-sm text-ink500/50 dark:text-slate-500">No projects added yet.</p>
      )}

      {fields.map((field, index) => (
        <div key={field.id} className="rounded-xl border border-ink-800/10 p-4 dark:border-white/10">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wide text-ink500/50 dark:text-slate-500">
              Project {index + 1}
            </span>
            <button
              type="button"
              onClick={() => remove(index)}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-ink500/40 hover:bg-red-500/10 hover:text-red-500"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <FormInput
              label="Project title"
              error={errors.projects?.[index]?.title?.message}
              {...register(`projects.${index}.title`, { required: "Required" })}
            />
            <FormInput
              label="Tech stack"
              placeholder="React, Node.js, MongoDB (comma-separated)"
              {...register(`projects.${index}.techStack`)}
            />
            <FormInput label="Link (optional)" placeholder="github.com/you/project" {...register(`projects.${index}.link`)} />
            <FormTextarea label="Description" rows={3} {...register(`projects.${index}.description`)} />
          </div>
        </div>
      ))}

      <Button type="button" variant="secondary" onClick={() => append(emptyProject)} className="w-fit">
        <Plus className="h-4 w-4" /> Add project
      </Button>
    </div>
  );
};

export default ProjectsStep;
