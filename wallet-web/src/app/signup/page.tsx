"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/");
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
            "url('https://plus.unsplash.com/premium_photo-1668473366952-45f06fbf6492?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        {/* Brand name top-left */}
        <div className="absolute top-6 left-8 z-20">
          <h1 className="text-3xl font-extrabold text-cyan-400 tracking-wide">
            Sovereign<span className="text-white">Id</span>
          </h1>
        </div>

        {/* Darker overlay for dark mode */}
        <div className="absolute bg-gradient-to-br from-gray-900 via-gray-800 to-black opacity-80 inset-0 z-0" />

        <div className="min-h-screen sm:flex sm:flex-row justify-center relative z-10">
          <div className="flex-col flex self-center p-10 sm:max-w-5xl xl:max-w-2xl text-white">
            <div className="hidden lg:flex flex-col">
              <h1 className="mb-3 font-bold text-5xl">Join Us</h1>
              <p className="pr-3 text-gray-300">
                Create your secure decentralized identity once, use everywhere.
              </p>
            </div>
          </div>

          <div className="flex justify-center self-center">
            <div className="ml-8"> {/* Nudges the box right */}
              <div className="p-12 bg-gray-800 mx-auto rounded-2xl w-96 shadow-lg">
                <div className="mb-4">
                  <h3 className="font-bold text-2xl text-white">Sign Up</h3>
                  <p className="text-gray-400">Create your new account.</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 tracking-wide">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full bg-gray-700 border border-gray-600 p-2 rounded-lg text-white focus:outline-none focus:border-blue-400"
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
                      className="w-full bg-gray-700 border border-gray-600 p-2 rounded-lg text-white focus:outline-none focus:border-blue-400"
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
                    {loading ? "Creating Account..." : "Sign Up"}
                  </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-400">
                  Already have an account?{" "}
                  <Link href="/login" className="text-blue-400 hover:underline">
                    Log In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
