"use server"

import { auth } from "@/lib/auth";
import { APIError } from "better-auth";
import { redirect } from "next/navigation";
import { z } from "zod";

interface SigninState {
  error?: {
    email?: string;
    password?: string;
    form?: string;
  };
  success?: boolean;
}

const formValidation = z.object({
  email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export default async function Signin(initialState: SigninState, formData: FormData): Promise<SigninState> {
  const form = formValidation.safeParse(Object.fromEntries(formData.entries()));

  const errors: {
    email?: string;
    password?: string;
  } = {}


  if (!form.success) {
    type ErrorFields = 'email' | 'password'
    form.error.issues.forEach(issue => {
      const fieldName = issue.path[0] as ErrorFields
      errors[fieldName] = issue.message
      console.log("validation error: ", issue.message)
    })
    return {
      error: {
        email: errors?.email,
        password: errors?.password
      }
    }
  }

  const { email, password } = form.data;

  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
        callbackURL: `${process.env.BETTER_AUTH_URL}`
      }
    })
    redirect("/");
  } catch (error: unknown) {
    if (error instanceof APIError) {
      console.log("instance error: ", error.message)
      return { success: false, error: { form: error.message } }
    }
    return { success: false }
  }
 
}