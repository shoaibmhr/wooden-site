import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  Armchair,
  Shield,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { adminLogin } from "../../services/api";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const data = await adminLogin(email, password);
      localStorage.setItem("admin_token", data.access_token);
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#12100f] px-4 py-12 text-stone-100 antialiased selection:bg-[#5c1f1f] selection:text-white">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-gradient-to-b from-[#5c1f1f]/30 via-amber-500/10 to-transparent blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Back to store */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-400 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Storefront</span>
          </Link>
          <span className="text-[10px] uppercase font-bold tracking-widest text-amber-500/80 flex items-center gap-1">
            <Shield className="h-3 w-3" /> Secure Access
          </span>
        </div>

        {/* Login Card */}
        <div className="relative overflow-hidden rounded-3xl border border-stone-800/90 bg-[#1e1a18]/90 p-8 shadow-2xl backdrop-blur-xl">
          {/* Logo & Header */}
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#5c1f1f] to-[#3a1313] text-amber-300 shadow-xl border border-amber-500/30">
              <Armchair className="h-7 w-7 text-amber-400" strokeWidth={1.75} />
            </div>

            <h1 className="mt-4 text-xl font-black uppercase tracking-wider text-stone-100 sm:text-2xl">
              WoodenSite
            </h1>
            <p className="mt-1 text-xs text-amber-400 font-semibold tracking-widest uppercase flex items-center justify-center gap-1.5">
              <Sparkles className="h-3 w-3" /> Admin & Staff Portal
            </p>
          </div>

          {error && (
            <div className="mt-6 rounded-xl border border-rose-900/60 bg-rose-950/40 p-3.5 text-xs text-rose-300 text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300">
                Email Address
              </label>
              <div className="relative mt-1.5">
                <Mail className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-stone-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@woodensite.com"
                  className="w-full rounded-xl border border-stone-700/80 bg-stone-900/90 py-3 pl-10 pr-3.5 text-xs text-stone-100 placeholder-stone-500 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300">
                  Password
                </label>
              </div>
              <div className="relative mt-1.5">
                <Lock className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-stone-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-stone-700/80 bg-stone-900/90 py-3 pl-10 pr-10 text-xs text-stone-100 placeholder-stone-500 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 p-0.5 text-stone-500 hover:text-stone-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#5c1f1f] to-[#732929] py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-xl border border-amber-500/20 transition-all hover:brightness-110 active:scale-95 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <span>Sign In to Dashboard</span>
              )}
            </button>
          </form>
        </div>

        {/* Footer info */}
        <p className="mt-6 text-center text-[11px] text-stone-500">
          WoodenSite Crafts & Furniture &copy; {new Date().getFullYear()}. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
