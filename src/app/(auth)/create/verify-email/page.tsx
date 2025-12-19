"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/authClient";

export default function EmailVerificationPage() {
  const { data: session, isPending, error, refetch } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    // If the user is already verified, redirect them.
    if (session?.user?.emailVerified) {
      router.push("/");
      return;
    }

    // Poll every 3 seconds to check if the email has been verified.
    const interval = setInterval(async () => {
      await refetch();
    }, 3000);

    // Cleanup the interval when the component unmounts.
    return () => clearInterval(interval);
  }, [session, refetch, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-2xl font-bold mb-4">Check your inbox</h1>
      <p className="mb-2">
        {"We've "}sent a verification link to <strong>{session?.user?.email}</strong>.
      </p>
      <p>Please click the link in the email to continue.</p>
      <p className="mt-4 text-gray-500">Waiting for verification...</p>
    </div>
  );
}
