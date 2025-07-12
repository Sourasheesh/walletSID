"use client";
import { useState, useEffect } from "react";
import { CheckCircleIcon, XCircleIcon, ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";

export default function RequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("verification_requests") || "[]");
    setRequests(stored);
  }, []);

  const handleApprove = (index: number) => {
    alert("✅ Verification approved! (In real flow, proof would be shared now.)");
    const newRequests = [...requests];
    newRequests.splice(index, 1);
    localStorage.setItem("verification_requests", JSON.stringify(newRequests));
    setRequests(newRequests);
  };

  const handleReject = (index: number) => {
    alert("❌ Verification rejected.");
    const newRequests = [...requests];
    newRequests.splice(index, 1);
    localStorage.setItem("verification_requests", JSON.stringify(newRequests));
    setRequests(newRequests);
  };

  return (
    <main className="pt-24 px-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
        Verification Requests
      </h1>

      {requests.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <ClipboardDocumentCheckIcon className="w-16 h-16 text-blue-400 mb-4" />
          <p className="text-gray-600 text-lg">No verification requests at the moment.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {requests.map((req, idx) => (
            <div
              key={idx}
              className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <ClipboardDocumentCheckIcon className="w-6 h-6 text-blue-500" />
                <p className="text-lg font-semibold text-gray-800">Request #{idx + 1}</p>
              </div>
              <p className="text-gray-700 mb-1">
                <span className="font-medium">Verifier:</span> {req.verifier}
              </p>
              <p className="text-gray-700 mb-4">
                <span className="font-medium">Credential Type:</span> {req.credentialType}
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => handleApprove(idx)}
                  className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow hover:from-emerald-500 hover:to-green-600 hover:-translate-y-0.5 transition"
                >
                  <CheckCircleIcon className="w-5 h-5" /> Approve
                </button>
                <button
                  onClick={() => handleReject(idx)}
                  className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold shadow hover:from-pink-500 hover:to-red-600 hover:-translate-y-0.5 transition"
                >
                  <XCircleIcon className="w-5 h-5" /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
