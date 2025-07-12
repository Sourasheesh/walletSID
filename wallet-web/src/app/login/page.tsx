//login

"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("wallet_logged_in", "true");
      router.push("/welcome");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-screen overflow-hidden flex items-center justify-center bg-gray-900 font-sans">
      <div
        className="bg-no-repeat bg-cover bg-center relative w-full h-full"
        style={{
          backgroundImage:
            "url('https://www.bleepstatic.com/content/hl-images/2021/05/26/Microsoft-Defender.jpg')",
        }}
      >
        {/* Brand name top-left */}
        <div className="absolute top-6 left-8 z-20">
          <h1 className="text-3xl font-extrabold text-cyan-400 tracking-wide">
            Sovereign<span className="text-white">Id</span>
          </h1>
        </div>

        {/* Darker overlay for dark mode */}
        <div className="absolute bg-gradient-to-br from-gray-900 via-gray-800 to-black opacity-90 inset-0 z-0" />

        <div className="min-h-screen sm:flex sm:flex-row justify-center relative z-10">
          <div className="flex-col flex self-center p-10 sm:max-w-5xl xl:max-w-2xl text-white">
            <div className="hidden lg:flex flex-col">
              <h1 className="mb-3 font-bold text-5xl">Welcome Back</h1>
              <p className="pr-3 text-gray-300">
                Your secure decentralized identity system. Verify once, use
                everywhere.
              </p>
            </div>
          </div>

          <div className="flex justify-center self-center">
            {/* Login form container */}
            <div className="p-12 bg-gray-800 mx-auto rounded-2xl w-96 shadow-lg">
              <div className="mb-6">
                <h3 className="font-bold text-2xl text-white">Log In</h3>
                <p className="text-gray-400">Please sign in to your account.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 tracking-wide">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full border border-gray-600 bg-gray-700 text-white p-2 rounded-lg focus:outline-none focus:border-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 tracking-wide">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full border border-gray-600 bg-gray-700 text-white p-2 rounded-lg focus:outline-none focus:border-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full tracking-wide font-semibold shadow-lg transition duration-300 ease-in ${
                    loading ? "cursor-not-allowed opacity-70" : ""
                  }`}
                >
                  {loading ? "Logging in..." : "Log in"}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-gray-400">
                Don’t have an account?{" "}
                <Link href="/signup" className="text-blue-400 underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}