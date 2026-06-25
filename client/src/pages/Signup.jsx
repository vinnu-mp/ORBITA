import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { Input } from "../components/index";
import { registerUser, verifyOTP, getCurrentUser } from "../api/auth.api";
import { login } from "../store/auth/authSlice";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [backendError, setBackendError] = useState("");

  const handleSendOTP = async () => {
    setBackendError("");

    const values = getValues();

    if (
      !values.username ||
      !values.fullname ||
      !values.email ||
      !values.password
    ) {
      setBackendError("Fill all fields before sending OTP");
      return;
    }

    try {
      setOtpLoading(true);

      await registerUser({
        username: values.username,
        fullname: values.fullname,
        email: values.email,
        password: values.password,
      });

      setOtpSent(true);
    } catch (error) {
      console.log(error);
      setBackendError(error?.response?.data?.message || "Failed to send OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setBackendError("");

    try {
      setVerifyLoading(true);

      await verifyOTP(data.otp);

      const currentUser = await getCurrentUser();

      dispatch(
        login({
          userData: currentUser.data.data,
        }),
      );

      navigate("/");
    } catch (error) {
      setBackendError(
        error?.response?.data?.message || "OTP verification failed",
      );
    } finally {
      setVerifyLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16 text-white">
      <div className="w-full max-w-xl">
        <div className="rounded-3xl border border-cyan-400/10 bg-[#07111f]/70 backdrop-blur-xl shadow-[0_0_40px_rgba(34,211,238,0.08)] p-8 md:p-10 transition-all duration-300 hover:border-cyan-400/20">
          <div className="space-y-3 mb-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-xs tracking-[0.25em] text-cyan-300 uppercase">
              Orbita • Join Platform
            </div>

            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Create Account
            </h1>

            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md mx-auto">
              Enter your details to start exploring space systems, launches,
              missions, and immersive cosmic experiences.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Username"
              placeholder="Enter username"
              {...register("username", {
                required: "Username is required",
              })}
              error={errors.username?.message}
            />

            <Input
              label="Full Name"
              placeholder="Enter full name"
              {...register("fullname", {
                required: "Fullname is required",
              })}
              error={errors.fullname?.message}
            />

            <Input
              label="Email"
              type="email"
              placeholder="Enter email"
              {...register("email", {
                required: "Email is required",
              })}
              error={errors.email?.message}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              error={errors.password?.message}
            />

            <div
              className={`overflow-hidden transition-all duration-500 ${
                otpSent ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="pt-2">
                <Input
                  label="OTP"
                  placeholder="Enter OTP"
                  {...register("otp", {
                    required: "OTP is required",
                  })}
                  error={errors.otp?.message}
                />
              </div>
            </div>

            {backendError && (
              <p className="text-red-400 text-sm text-center">{backendError}</p>
            )}

            {!otpSent ? (
              <button
                data-cursor="button"
                type="button"
                onClick={handleSendOTP}
                disabled={otpLoading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 font-semibold tracking-wide text-black transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_25px_rgba(34,211,238,0.25)] disabled:opacity-60"
              >
                {otpLoading ? "Sending OTP..." : "Send OTP"}
              </button>
            ) : (
              <button
                data-cursor="button"
                type="submit"
                disabled={verifyLoading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 font-semibold tracking-wide text-black transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_25px_rgba(34,211,238,0.25)] disabled:opacity-60"
              >
                {verifyLoading ? "Verifying..." : "Verify OTP & Continue"}
              </button>
            )}

            <p className="text-center text-gray-400 text-sm pt-3">
              Already have an account?{" "}
              <Link
                data-cursor="link"
                to="/login"
                className="text-cyan-300 hover:text-cyan-200 transition-colors duration-300"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
