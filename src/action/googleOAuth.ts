"use server"
import { auth } from "@/lib/auth";
import { APIError } from "better-auth";
import { redirect } from "next/navigation";


export default async function Googlelogin(): Promise<{ error?: string | null; url?: string }> {
  try {
    const response = await auth.api.signInSocial({
      body: {
        provider: "google",
      }
    })

    console.log("Google OAuth Response: ", response.url);

    if (response.url) {
      return  { url: response.url  };
    }

    return { error: "Failed to initiate Google OAuth." }
  } catch (error) {
    if (error instanceof APIError) {
      console.log("Error: ", error.message)
      return { error: error.message }
    }
    return { error: "An unknown error occurred." }

  }
}