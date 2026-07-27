import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import userService from "../services/userService";
import { useAuth } from "../hooks/useAuth";

const Profile = () => {
  const { user, updateLocalUser } = useAuth();

  const profileForm = useForm({
    defaultValues: { name: user?.name || "", headline: user?.headline || "" },
  });

  const passwordForm = useForm();

  const onProfileSubmit = async (formData) => {
    try {
      const { user: updated } = await userService.updateProfile(formData);
      updateLocalUser(updated);
      toast.success("Profile updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not update profile");
    }
  };

  const onPasswordSubmit = async (formData, event) => {
    try {
      await userService.changePassword(formData);
      toast.success("Password changed");
      event.target.reset();
      passwordForm.reset();
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not change password");
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-1 text-2xl font-semibold text-ink500 dark:text-slate-100">Profile</h1>
      <p className="mb-8 text-sm text-ink500/60 dark:text-slate-400">
        Manage your account details and security.
      </p>

      <section className="mb-8 rounded-2xl border border-ink-800/8 bg-paper-card p-6 dark:border-white/8 dark:bg-ink-900">
        <h2 className="mb-4 font-display text-lg font-semibold text-ink500 dark:text-slate-100">
          Personal details
        </h2>
        <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="flex flex-col gap-4">
          <FormInput label="Full name" {...profileForm.register("name", { required: true })} />
          <FormInput
            label="Headline"
            placeholder="e.g. Final-year IT student, aspiring full-stack developer"
            {...profileForm.register("headline")}
          />
          <FormInput label="Email" value={user?.email || ""} disabled />

          <Button type="submit" loading={profileForm.formState.isSubmitting} className="w-fit">
            Save changes
          </Button>
        </form>
      </section>

      <section className="rounded-2xl border border-ink-800/8 bg-paper-card p-6 dark:border-white/8 dark:bg-ink-900">
        <h2 className="mb-4 font-display text-lg font-semibold text-ink500 dark:text-slate-100">
          Change password
        </h2>
        <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="flex flex-col gap-4">
          <FormInput
            label="Current password"
            type="password"
            error={passwordForm.formState.errors.currentPassword?.message}
            {...passwordForm.register("currentPassword", { required: "Required" })}
          />
          <FormInput
            label="New password"
            type="password"
            error={passwordForm.formState.errors.newPassword?.message}
            {...passwordForm.register("newPassword", {
              required: "Required",
              minLength: { value: 6, message: "At least 6 characters" },
            })}
          />

          <Button type="submit" loading={passwordForm.formState.isSubmitting} className="w-fit">
            Update password
          </Button>
        </form>
      </section>
    </div>
  );
};

export default Profile;
