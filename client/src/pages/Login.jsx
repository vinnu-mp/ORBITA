import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { Input } from "../components/index";
import { loginUser, getCurrentUser } from "../api/auth.api";
import { login } from "../store/auth/authSlice";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [backendError, setBackendError] = useState("");

  const onSubmit = async (data) => {
    setBackendError("");

    try {
      setLoading(true);

      await loginUser({
        email: data.identifier.includes("@") ? data.identifier : "",

        username: !data.identifier.includes("@") ? data.identifier : "",

        password: data.password,
      });

      const currentUser = await getCurrentUser();

      dispatch(
        login({
          userData: currentUser.data.data,
        }),
      );

      navigate("/");
    } catch (error) {
      console.log(error);
      setBackendError(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16 text-white">
      <div className="w-full max-w-xl">
        <div className="rounded-3xl border border-cyan-400/10 bg-[#07111f]/70 backdrop-blur-xl shadow-[0_0_40px_rgba(34,211,238,0.08)] p-8 md:p-10 transition-all duration-300 hover:border-cyan-400/20">
          <div className="space-y-3 mb-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-xs tracking-[0.25em] text-cyan-300 uppercase">
              Orbita • Welcome Back
            </div>

            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent py-2">
              Login
            </h1>

            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md mx-auto">
              Continue your journey through launches, missions, deep-space
              discoveries, and futuristic exploration systems.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Email or Username"
              placeholder="Enter email or username"
              {...register("identifier", {
                required: "Email or username is required",
              })}
              error={errors.identifier?.message}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter password"
              {...register("password", {
                required: "Password is required",
              })}
              error={errors.password?.message}
            />

            {backendError && (
              <p className="text-red-400 text-sm text-center">{backendError}</p>
            )}

            <button
              data-cursor="button"
              data-cursor="button"
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 font-semibold tracking-wide text-black transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_25px_rgba(34,211,238,0.25)] disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-center text-gray-400 text-sm pt-3">
              Don&apos;t have an account?{" "}
              <Link
                data-cursor="link"
                to="/signup"
                className="text-cyan-300 hover:text-cyan-200 transition-colors duration-300"
              >
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
