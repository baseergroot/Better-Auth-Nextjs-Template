'use client'

import Googlelogin from "@/action/googleOAuth";
import { useTransition } from "react";
import { Chrome } from "lucide-react";
import { Button } from "./ui/button";

export default function GoogleOAuthBtn() {
  const [isPending, startTransition] = useTransition();

  const handleGoogleLogin = () => {
    startTransition(async () => {
      const response = await Googlelogin();
      if (response.url) {
        window.location.href = response.url;
      } else {
        console.error("Google OAuth Error: ", response.error);
      }
    });
  };

  return (
    <Button
      onClick={handleGoogleLogin}
      variant="outline"
      disabled={isPending}
      type="button"
      className="w-full"
    >
      <Chrome className="mr-2 h-4 w-4" />
      <span className="text-sm font-medium">
        Continue with Google
      </span>
    </Button>
  );
}