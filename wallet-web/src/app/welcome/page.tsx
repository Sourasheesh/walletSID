// src/app/welcome/page.tsx
"use client";
import Link from "next/link";

export default function WelcomePage() {
  return (
    <main className="h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-bold text-cyan-400">Welcome to SovereignID</h1>
        <p className="text-gray-300">Choose an action below to continue:</p>
        <div className="flex flex-col space-y-4 items-center">
          <Link
            href="/credential"
            className="bg-blue-600 px-6 py-3 rounded-full hover:bg-blue-700 transition text-white"
          >
            🪪 My Credentials
          </Link>
          <Link
            href="/claim"
            className="bg-green-600 px-6 py-3 rounded-full hover:bg-green-700 transition text-white"
          >
            🎯 Claim
          </Link>
          <Link
            href="/requests"
            className="bg-yellow-600 px-6 py-3 rounded-full hover:bg-yellow-700 transition text-white"
          >
            📩 Request
          </Link>
        </div>
      </div>
    </main>
  );
}
