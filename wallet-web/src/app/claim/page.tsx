"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ClaimPage() {
  const [data, setData] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsed = JSON.parse(data);
      const current = JSON.parse(localStorage.getItem("my_credentials") || "[]");
      current.push(parsed);
      localStorage.setItem("my_credentials", JSON.stringify(current));

      alert("Credential successfully added to your wallet!");
      router.push("/");
    } catch (error) {
      alert("Invalid data format. Please paste valid JSON.");
    }
  };

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Claim Credential</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 space-y-4">
        <textarea
          value={data}
          onChange={(e) => setData(e.target.value)}
          rows={8}
          placeholder='Paste credential JSON here'
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:border-primary"
        ></textarea>
        <button
          type="submit"
          className="bg-primary text-black px-5 py-2 rounded hover:bg-secondary transition w-full"
        >
          Add to Wallet
        </button>
      </form>
    </main>
  );
}
