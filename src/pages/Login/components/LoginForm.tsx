import React from "react";
import { Link } from "react-router-dom";
import { Spinner } from "components/Icons";
import image from "assets/images/google-icon.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  onGoogleSignIn: () => void;
  error: any;
  isLoading: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  onGoogleSignIn,
  isLoading,
  error,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmitForm = (data: LoginFormInputs) => {
    onSubmit(data.email, data.password);
  };

  return (
    <div className="bg-white w-full lg:w-1/2 flex flex-col justify-center items-center py-10 lg:py-0">
      <h3 className="text-3xl lg:text-4xl font-['Oswald']">Login</h3>
      <form
        className="flex flex-col mt-10 w-full lg:w-1/2 px-8 lg:px-0"
        onSubmit={handleSubmit(onSubmitForm)}
      >
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="text-light text-xs tracking-wide uppercase mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="px-3 py-2 border border-gray-500 bg-white rounded-sm"
            placeholder="Email"
            required
            {...register("email")}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && (
            <p className="text-sm text-red-700 pt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="text-light text-xs tracking-wide uppercase mb-1 mt-6"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="px-3 py-2 border border-gray-500 bg-white rounded-sm"
            placeholder="Password"
            required
            {...register("password")}
            aria-invalid={errors.password ? "true" : "false"}
          />
          {errors.password && (
            <p className="text-sm text-red-700 pt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        {error && <p className="text-sm text-red-700 mb-4 pt-1">{error}</p>}
        <button
          type="submit"
          className="flex justify-center items-center bg-gray-800 text-white py-2 rounded mt-6 hover:sm:bg-slate-600 transition"
          disabled={isLoading}
          data-testid="login-button"
        >
          {isLoading ? <Spinner /> : "Login"}
        </button>
      </form>
      <div className="flex gap-1 mt-10 text-sm">
        <p>Don't have an account?</p>
        <Link to="/register" className="text-blue-600">
          Register
        </Link>
      </div>
      <button
        className="flex gap-2 border rounded px-6 py-3 text-sm mt-4 hover:sm:shadow hover:shadow-gray-200/50 transition ease-out"
        onClick={onGoogleSignIn}
      >
        <img src={image} width="20" height="20" alt="Google" />
        Sign In With Google
      </button>
    </div>
  );
};
