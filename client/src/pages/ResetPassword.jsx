import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import authService from "../services/authService";
import { useAuth } from "../hooks/useAuth";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { updateLocalUser } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async ({ password }) => {
    try {
      const data = await authService.resetPassword(token, password);
      localStorage.setItem("resumeai_token", data.token);
      toast.success("Password reset — you're logged in");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Reset link is invalid or expired");
    }
  };

  return (
    <div>
      <h1 className="mb-1 text-2xl font-semibold text-ink500 dark:text-slate-100">Set a new password</h1>
      <p className="mb-6 text-sm text-ink500/60 dark:text-slate-400">
        Choose a new password for your account.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormInput
          label="New password"
          type="password"
          placeholder="At least 6 characters"
          error={errors.password?.message}
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Password must be at least 6 characters" },
          })}
        />
        <FormInput
          label="Confirm new password"
          type="password"
          placeholder="Re-enter password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === watch("password") || "Passwords do not match",
          })}
        />

        <Button type="submit" loading={isSubmitting} className="mt-2 w-full">
          Reset password
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink500/60 dark:text-slate-400">
        <Link to="/login" className="font-medium text-navy-600 dark:text-gold-400">
          Back to login
        </Link>
      </p>
    </div>
  );
};

export default ResetPassword;
