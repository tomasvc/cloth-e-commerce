import React, { useState } from "react";
import {
  getAuth,
  updateProfile,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { createUserDocumentFromAuth } from "utils/firebase";
import { userLogin } from "slices/userSlice";
import { Spinner } from "components/Icons";
import { useForm, SubmitHandler } from "react-hook-form";

import image from "assets/images/register-bg.jpg";

interface IFormInputs {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export const Register: React.FC = () => {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>();
  const [isLoading, setIsLoading] = useState(false);

  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<IFormInputs> = async (data: any) => {
    try {
      setIsLoading(true);
      await createUserWithEmailAndPassword(auth, data?.email, data?.password);
      if (auth.currentUser) {
        await createUserDocumentFromAuth(auth.currentUser);
        await updateProfile(auth.currentUser, { displayName: data?.name });
        dispatch(userLogin(auth.currentUser));
        setIsLoading(false);
        navigate("/login");
      }
    } catch (error: any) {
      console.log(error);
      setSubmitError(error.code);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row justify-between w-screen max-h-screen">
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-8 pt-10 pb-14 lg:p-0">
        <h3 className="text-3xl lg:text-4xl font-['Oswald']">Register</h3>
        <form
          className="flex flex-col mt-8 w-full lg:w-1/2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col mb-4">
            <label
              htmlFor="name"
              className="text-light text-xs tracking-wide uppercase mb-1"
            >
              Name
            </label>
            <input
              type="text"
              className="px-3 py-2 border border-gray-500 bg-white rounded-sm text-sm"
              placeholder="Name"
              required
              {...register("name", { required: true })}
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name?.type === "required" && (
              <p role="alert" className="text-sm text-red-700 pt-1">
                Name is required
              </p>
            )}
          </div>

          <div className="flex flex-col mb-4">
            <label
              htmlFor="email"
              className="text-light text-xs tracking-wide uppercase mb-1"
            >
              Email
            </label>
            <input
              type="email"
              className="px-3 py-2 border border-gray-500 bg-white rounded-sm text-sm"
              placeholder="Email"
              required
              {...register("email", { required: true })}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <p role="alert" className="text-sm text-red-700 pt-1">
                {errors.email?.message as string}
              </p>
            )}
            {submitError === "auth/email-already-in-use" && (
              <p role="alert" className="text-sm text-red-700 pt-1">
                This email is already in use
              </p>
            )}
          </div>

          <div className="flex flex-col mb-4">
            <label
              htmlFor="password1"
              className="text-light text-xs tracking-wide uppercase mb-1"
            >
              Password
            </label>
            <input
              type="password"
              className="px-3 py-2 border border-gray-500 bg-white rounded-sm text-sm"
              placeholder="Password"
              required
              {...register("password", { required: true })}
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password?.type === "required" && (
              <p role="alert" className="text-sm text-red-700 pt-1">
                Password is required
              </p>
            )}
          </div>

          <div className="flex flex-col mb-4">
            <label
              htmlFor="passwordConfirm"
              className="text-light text-xs tracking-wide uppercase mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              className="px-3 py-2 border border-gray-500 bg-white rounded-sm text-sm"
              placeholder="Confirm password"
              required
              {...register("passwordConfirm", {
                required: true,
                validate: (val: string) => {
                  if (watch("password") !== val) {
                    return "Your passwords do not match";
                  }
                },
              })}
              aria-invalid={errors.passwordConfirm ? "true" : "false"}
            />
            {errors.passwordConfirm?.type === "required" && (
              <p role="alert" className="text-sm text-red-700 pt-1">
                Password confirmation is required
              </p>
            )}
            {errors.passwordConfirm && (
              <p role="alert" className="text-sm text-red-700 pt-1">
                {errors.passwordConfirm?.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="flex justify-center items-center bg-gray-800 text-white py-2 rounded mt-3 hover:sm:bg-slate-600 transition"
          >
            {isLoading ? <Spinner /> : "Register"}
          </button>
        </form>
        <p className="text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
      <div className="w-full lg:w-1/2">
        <img
          className="object-cover object-image-mobile lg:object-top w-full h-full"
          src={image}
          alt="Register background"
        />
      </div>
    </div>
  );
};
