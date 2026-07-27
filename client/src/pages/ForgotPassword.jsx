import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { CheckCircle2 } from "lucide-react";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import authService from "../services/authService";

const ForgotPassword = () => {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async ({ email }) => {
    try {
      await authService.forgotPassword(email);
      setSent(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center text-center">
        <CheckCircle2 className="mb-4 h-10 w-10 text-navy-600 dark:text-gold-400" />
        <h1 className="mb-2 text-xl font-semibold text-ink500 dark:text-slate-100">Check your email</h1>
        <p className="mb-6 text-sm text-ink500/60 dark:text-slate-400">
          If that email is registered, we've sent a link to reset your password.
        </p>
        <Link to="/login" className="text-sm font-medium text-navy-600 dark:text-gold-400">
          Back to login
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-1 text-2xl font-semibold text-ink500 dark:text-slate-100">Reset your password</h1>
      <p className="mb-6 text-sm text-ink500/60 dark:text-slate-400">
        Enter your email and we'll send you a reset link.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormInput
          label="Email"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
          })}
        />

        <Button type="submit" loading={isSubmitting} className="mt-2 w-full">
          Send reset link
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink500/60 dark:text-slate-400">
        Remembered it?{" "}
        <Link to="/login" className="font-medium text-navy-600 dark:text-gold-400">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
