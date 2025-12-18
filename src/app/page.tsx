import LogoutBtn from "@/components/logout";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { ShieldCheck, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

export default async function Home() {
  const session = await auth.api.getSession({ headers: await headers() });

  console.log("SESSION", session);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <main className="flex flex-1 flex-col items-center justify-center p-8 text-center">
        <div className="mb-8 flex items-center justify-center gap-3">
          <ShieldCheck className="h-12 w-12 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Better Auth
          </h1>
        </div>
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">
          The complete authentication solution for Next.js
        </h2>
        <p className="mb-10 max-w-2xl text-lg text-muted-foreground">
          This is a production-ready Next.js template featuring secure
          authentication with both traditional email/password and one-click
          Google OAuth. Built with Better Auth, Tailwind CSS, and Shadcn/UI.
        </p>
        <div className="flex items-center gap-4">
          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={session.user.image ?? ""} alt={session.user.name ?? ""} />
                    <AvatarFallback>
                      {session.user.name ? (
                        getInitials(session.user.name)
                      ) : (
                        <User className="h-5 w-5" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{session.user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{session.user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><LogoutBtn /></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button size="lg">Get Started</Button>
            </Link>
          )}
          <Button size="lg" variant="outline" asChild>
            <a
              href="https://github.com/baseergroot/Better-Auth-Nextjs-Template" // Replace with your repo link
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </Button>
        </div>
      </main>
      <footer className="py-6 text-sm text-muted-foreground">
        Built with ❤️ for the community.
      </footer>
    </div>
  );
}
