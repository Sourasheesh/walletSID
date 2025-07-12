"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("wallet_logged_in");
      router.push("/login");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <nav className="w-full flex justify-between items-center px-12 py-4 bg-white/70 backdrop-blur-md shadow-md fixed top-0 left-0 z-50">
      {/* Brand */}
      <Link href="/" className="flex items-center">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent tracking-tight ml-2">
        Sovereign Id
        </h1>

      </Link>

      {/* Links */}
     <div className="flex gap-16 items-center">
        {[
          { href: "/", label: "My Credential" },
          { href: "/claim", label: "‎ ‎ Claim" },
          { href: "/requests", label: "‎ ‎ Request‎ ‎ " },
        ].map((link) => (
          <Link key={link.href} href={link.href}>
            <span className="text-gray-800 font-medium hover:text-blue-600 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
              {link.label}
            </span>
          </Link>
        ))}

        <button
          onClick={handleLogout}
          className="ml-4 px-4 py-2 bg-gradient-to-r from-blue-300 to-blue-700 rounded-full text-black font-semibold shadow-md hover:brightness-110 hover:-translate-y-0.5 transition-all duration-200"
        >
        Logout
        </button>
      </div>

    </nav>
  );
}
