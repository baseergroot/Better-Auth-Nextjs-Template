"use server"

import { auth } from "@/lib/auth";
import { APIError } from "better-auth";
import { redirect } from "next/navigation";
import { z } from "zod";

interface SignupState {
  error?: {
    name?: string;
    email?: string;
    password?: string;
  };
  success?: boolean;
  redirect?: boolean;
}

const formValidation = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long").max(50, "Name must be at most 50 characters long"),
  email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long").max(100, "Password must be at most 100 characters long"),
});

export default async function Signup(initialState: SignupState, formData: FormData): Promise<SignupState> {
  const form = formValidation.safeParse(Object.fromEntries(formData.entries()));

  const errors: {
    name?: string;
    email?: string;
    password?: string;
  } = {}


  if (!form.success) {
    type ErrorFields = 'name' | 'email' | 'password'
    form.error.issues.forEach(issue => {
      const fieldName = issue.path[0] as ErrorFields
      errors[fieldName] = issue.message
      console.log("validation error: ", issue.message)
    })
    return {
      error: {
        name: errors?.name,
        email: errors?.email,
        password: errors?.password
      }
    }
  }

  const { name, email, password } = form.data;

  try {
    const response = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        callbackURL: `${process.env.BETTER_AUTH_URL}`
      }
    })
    console.log("auth res: ", response)

    return {success: true, redirect: true}

  } catch (error: unknown) {
    if (error instanceof APIError) {
      console.log("auth catch: ", error.message)
      return {
        success: false, error: {
          email: error?.message || "An unexpected error occurred. Please try again."
        }
      }
    }
    console.log('auth else error: ', error)
    return {success: false}

  }
}