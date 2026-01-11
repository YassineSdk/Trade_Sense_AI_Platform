import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, Lock, Eye, EyeOff, ArrowRight, TrendingUp } from "lucide-react";
import { authApi, handleApiError } from "@services/api";
import { useAuthStore } from "@store/authStore";
import { Button } from "@/components/ui/Button";
import { Orb } from "@/components/ui/Orb";

// Validation schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, setLoading, isLoading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);
      const response = await authApi.login(data);

      if (response.success && response.data) {
        const { user, access_token, refresh_token } = response.data;
        login(user, access_token, refresh_token);
        toast.success("Welcome back! Login successful.");
        navigate("/dashboard");
      } else {
        toast.error(response.message || "Login failed");
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

        {/* Login Card */}
        <div className="rounded-2xl bg-gray-900/40 backdrop-blur-2xl border border-white/10 p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400">Sign in to continue to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                  placeholder="Enter your password"
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

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-white/20 bg-gray-900/60 text-primary focus:ring-primary focus:ring-offset-0 focus:ring-2"
                />
                <span className="text-sm text-gray-400">Remember me</span>
              </label>

              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Forgot password?
              </Link>
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
                "Signing in..."
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
            <p className="text-xs font-bold text-primary mb-2 uppercase tracking-wider">
              Demo Credentials
            </p>
            <div className="space-y-1 text-xs text-gray-400 font-mono">
              <p>admin@tradesense.ai / admin123</p>
              <p>user@tradesense.ai / user123</p>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Sign up
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
