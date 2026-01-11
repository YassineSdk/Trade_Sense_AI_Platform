import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { authApi, handleApiError } from "@services/api";
import { useAuthStore } from "@store/authStore";
import { Button } from "@/components/ui/Button";
import { Orb } from "@/components/ui/Orb";

// Validation schema
const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login, setLoading, isLoading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setLoading(true);
      const response = await authApi.register({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (response.success && response.data) {
        const { user, access_token, refresh_token } = response.data;
        login(user, access_token, refresh_token);
        toast.success(
          "Account created successfully! Welcome to TradeSense AI.",
        );
        navigate("/dashboard");
      } else {
        toast.error(response.message || "Registration failed");
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Orb Background - Same as Hero */}
      <Orb />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center justify-center gap-2 mb-8 group"
        >
          <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
            <TrendingUp className="h-6 w-6 text-gray-900" />
          </div>
          <span className="text-2xl font-bold text-white">TradeSense</span>
        </Link>

        {/* Register Card */}
        <div className="rounded-2xl bg-gray-900/40 backdrop-blur-2xl border border-white/10 p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Create Account
            </h1>
            <p className="text-gray-400">Get started with TradeSense AI</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  {...register("name")}
                  type="text"
                  placeholder="John Doe"
                  className={`w-full pl-12 pr-4 py-3 rounded-xl bg-gray-900/60 backdrop-blur-xl border ${
                    errors.name
                      ? "border-loss focus:border-loss"
                      : "border-white/10 focus:border-primary/40"
                  } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all`}
                />
              </div>
              {errors.name && (
                <p className="mt-2 text-sm text-loss">{errors.name.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  {...register("email")}
                  type="email"
                  placeholder="you@example.com"
                  className={`w-full pl-12 pr-4 py-3 rounded-xl bg-gray-900/60 backdrop-blur-xl border ${
                    errors.email
                      ? "border-loss focus:border-loss"
                      : "border-white/10 focus:border-primary/40"
                  } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all`}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-loss">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  className={`w-full pl-12 pr-12 py-3 rounded-xl bg-gray-900/60 backdrop-blur-xl border ${
                    errors.password
                      ? "border-loss focus:border-loss"
                      : "border-white/10 focus:border-primary/40"
                  } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-loss">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  {...register("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Repeat password"
                  className={`w-full pl-12 pr-12 py-3 rounded-xl bg-gray-900/60 backdrop-blur-xl border ${
                    errors.confirmPassword
                      ? "border-loss focus:border-loss"
                      : "border-white/10 focus:border-primary/40"
                  } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-loss">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  {...register("acceptTerms")}
                  type="checkbox"
                  className="w-4 h-4 mt-0.5 rounded border-white/20 bg-gray-900/60 text-primary focus:ring-primary focus:ring-offset-0 focus:ring-2"
                />
                <span className="text-sm text-gray-400 leading-relaxed">
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.acceptTerms && (
                <p className="mt-2 text-sm text-loss">
                  {errors.acceptTerms.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                "Creating account..."
              ) : (
                <>
                  Create Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-sm text-gray-500 hover:text-gray-400 transition-colors inline-flex items-center gap-2"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
