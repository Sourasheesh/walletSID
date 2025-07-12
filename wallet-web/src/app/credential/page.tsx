"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function CredentialDetailPage() {
  const params = useParams();
  const [credential, setCredential] = useState<any>(null);

  useEffect(() => {
    const creds = JSON.parse(localStorage.getItem("my_credentials") || "[]");
    console.log("All creds:", creds);
    const idx = parseInt(params.index as string);
    console.log("Index param:", idx);

    if (!isNaN(idx) && creds[idx]) {
      setCredential(creds[idx]);
      console.log("Credential found:", creds[idx]);
    } else {
      console.log("Credential not found, staying here!");
      setCredential(undefined);
    }
  }, [params.index]);

  if (credential === null) {
    return <div className="p-6 text-center">Loading credential...</div>;
  }

  if (credential === undefined) {
    return (
      <main className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8 mt-10 border border-gray-200 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Credential Not Found</h1>
        <p className="text-gray-600 mb-6">
          The credential you're looking for does not exist.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        >
          Back to Wallet
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8 mt-10 border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Credential Detail</h1>

      <div className="space-y-4">
        <p><strong>Recipient:</strong> {credential.recipientName}</p>
        <p><strong>Type:</strong> {credential.credentialType}</p>
        <p><strong>Description:</strong> {credential.description}</p>
        <p>
          <strong>IPFS URL:</strong>{" "}
          <a href={credential.ipfsUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            View Document
          </a>
        </p>
        <p>
          <strong>Blockchain Txn:</strong>{" "}
          <a
            href={`https://sepolia.etherscan.io/tx/${credential.blockchainHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Verify on Chain
          </a>
        </p>
      </div>

      <Link
        href="/"
        className="inline-block mt-6 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
      >
        Back to Wallet
      </Link>
    </main>
  );
}
