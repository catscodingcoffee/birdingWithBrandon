"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else router.push("/");
    setLoading(false);
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else setError("Check your email to confirm your account.");
    setLoading(false);
  }

  return (
    <div className="space-y-8">
      
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          {mode === "login" ? "Login to Your Account" : "Create a New Account"}
        </h1>
        <form onSubmit={mode==="login"?handleLogin:handleSignup} className="flex flex-col gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 dark:focus:ring-sky-600 placeholder:text-gray-400 dark:placeholder:text-gray-600"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="**********"
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 dark:focus:ring-sky-600 placeholder:text-gray-400 dark:placeholder:text-gray-600"
            />
            <button
              type="submit"
              disabled={loading || !email.trim() || !password.trim()}
              className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {mode === "login" ? "Login" : "Sign Up"}
            </button>
            <p className="text-sm text-gray-500">
              {mode === "login" ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"                                                             
                onClick={() => setMode(mode === "login" ? "signup" : "login")}
                className="text-sky-600 hover:underline"                                  
              >
                {mode === "login" ? "Sign up" : "Log in"}                                 
              </button>                                                                   
            </p>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </form>
    </div>
  );
}
