import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { useAuth } from "../hooks/useAuth";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async ({ name, email, password }) => {
    try {
      await signup({ name, email, password });
      toast.success("Account created");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not create account");
    }
  };

  return (
    <div>
      <h1 className="mb-1 text-2xl font-semibold text-ink500 dark:text-slate-100">Create your account</h1>
      <p className="mb-6 text-sm text-ink500/60 dark:text-slate-400">
        Start building resumes that actually get read.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormInput
          label="Full name"
          placeholder="Jhon Doe"
          error={errors.name?.message}
          {...register("name", { required: "Name is required" })}
        />
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
        <FormInput
          label="Password"
          type="password"
          placeholder="At least 6 characters"
          error={errors.password?.message}
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Password must be at least 6 characters" },
          })}
        />
        <FormInput
          label="Confirm password"
          type="password"
          placeholder="Re-enter password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === watch("password") || "Passwords do not match",
          })}
        />

        <Button type="submit" loading={isSubmitting} className="mt-2 w-full">
          Create account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink500/60 dark:text-slate-400">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-navy-600 dark:text-gold-400">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default Signup;
