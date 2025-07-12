"use client";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CredentialDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [credential, setCredential] = useState<any>(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("my_credentials") || "[]");
    if (stored[Number(id)]) {
      setCredential(stored[Number(id)]);
    } else {
      router.push("/");
    }
  }, [id, router]);

  if (!credential) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-4">{credential.credentialType}</h1>
        <p className="mb-2"><strong>Description:</strong> {credential.description}</p>
        <p className="mb-2"><strong>Recipient:</strong> {credential.recipientName}</p>
        <p className="mb-2">
          <strong>IPFS:</strong>{" "}
          <a href={credential.ipfsUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            View Document
          </a>
        </p>
        <p className="mb-4">
          <strong>Blockchain Tx:</strong>{" "}
          <a href={`https://sepolia.etherscan.io/tx/${credential.blockchainHash}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            Verify on Chain
          </a>
        </p>
        <Link href="/" className="inline-block bg-primary text-white px-5 py-2 rounded hover:bg-secondary transition">
          Back to Wallet
        </Link>
      </div>
    </main>
  );
}
