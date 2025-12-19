"use client";

import Link from "next/link";
import Signup from "@/action/signup";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import GoogleOAuthBtn from "./googleOAuthBtn";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const [state, formAction, pending] = useActionState(Signup, { success: false });
  const router = useRouter()

  if (state.redirect) {
    router.push("/create/verify-email")
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account.
          </CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Max Robinson" required />
              {state.error?.name && (
                <p className="text-sm text-red-500">{state.error.name}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
              {state.error?.email && (
                <p className="text-sm text-red-500">{state.error.email}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
              {state.error?.password && (
                <p className="text-sm text-red-500">
                  {state.error.password}
                </p>
              )}
            </div>
            <Button type="submit" className={`w-full ${pending && "cursor-not-allowed"}`} disabled={pending}>{pending ? "Signing Up..." : "Sign Up"}</Button>
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <GoogleOAuthBtn />
          </CardContent>
        </form>
        <CardFooter>
          <div className="text-center text-sm w-full">
            Already have an account?{" "}
            <Link href="/login" className="underline">Login</Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}