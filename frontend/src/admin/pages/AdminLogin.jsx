import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { adminLogin } from "../../services/api";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@ashtech.com");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    try {
      await adminLogin(email, password);
      navigate("/admin");
    } catch (err) {
      setErrorMsg(err.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1c1917] px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#5c1f1f] text-amber-300 font-bold text-2xl shadow-xl border border-amber-900/40">
            AW
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-stone-100 uppercase">
            Ashtech Wooden
          </h1>
          <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-amber-500">
            Admin Portal Access
          </p>
        </div>

        <div className="rounded-2xl border border-stone-800 bg-[#262220] p-6 shadow-2xl sm:p-8">
          <div className="flex items-center gap-2 pb-4 border-b border-stone-800">
            <ShieldCheck className="h-5 w-5 text-amber-500" />
            <h2 className="text-sm font-semibold text-stone-200 uppercase tracking-wide">
              Secure Sign In
            </h2>
          </div>

          {errorMsg && (
            <div className="mt-4 rounded-lg border border-rose-900/50 bg-rose-950/40 p-3 text-xs text-rose-300">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-medium text-stone-400">
                Admin Email
              </label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-stone-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@ashtech.com"
                  className="w-full rounded-lg border border-stone-700 bg-stone-900 py-2.5 pl-10 pr-3.5 text-sm text-stone-100 placeholder-stone-600 focus:border-[#5c1f1f] focus:ring-1 focus:ring-[#5c1f1f] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-400">
                Password
              </label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3.5 top-3 h-4 w-4 text-stone-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-stone-700 bg-stone-900 py-2.5 pl-10 pr-3.5 text-sm text-stone-100 placeholder-stone-600 focus:border-[#5c1f1f] focus:ring-1 focus:ring-[#5c1f1f] focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#5c1f1f] py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#732929] hover:shadow-xl disabled:opacity-50"
            >
              {isLoading ? "Authenticating..." : "Sign In to Dashboard"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-6 border-t border-stone-800 pt-4 text-center">
            <Link
              to="/"
              className="text-xs text-stone-500 hover:text-amber-400 transition-colors"
            >
              ← Back to Customer Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
