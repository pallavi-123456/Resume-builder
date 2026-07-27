import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      await login(formData);
      toast.success("Welcome back");
      const redirectTo = location.state?.from?.pathname || "/dashboard";
      navigate(redirectTo, { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not log in");
    }
  };

  return (
    <div>
      <h1 className="mb-1 text-2xl font-semibold text-ink500 dark:text-slate-100">Welcome back</h1>
      <p className="mb-6 text-sm text-ink500/60 dark:text-slate-400">
        Log in to keep working on your resumes.
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
        <FormInput
          label="Password"
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register("password", { required: "Password is required" })}
        />

        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-sm font-medium text-navy-600 dark:text-gold-400">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" loading={isSubmitting} className="mt-2 w-full">
          Log in
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink500/60 dark:text-slate-400">
        Don't have an account?{" "}
        <Link to="/signup" className="font-medium text-navy-600 dark:text-gold-400">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
