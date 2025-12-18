"use server"

import { auth } from "@/lib/auth";
import { APIError } from "better-auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export default async function Logout() {
  try {
    await auth.api.signOut({ headers: await headers() });

  revalidatePath("/");

  return { success: true };
  } catch (error) {
    if (error instanceof APIError) {
      console.error("Logout error:", error.message);
      return { success: false };
    } else {
      console.error("Logout error:", error);
      return { success: false };
    }
  }
}

