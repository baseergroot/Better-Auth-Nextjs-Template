import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client } from "./connectDB";
import { nextCookies } from "better-auth/next-js";
import { sendEmail } from "./email";

export const auth = betterAuth({
  database: mongodbAdapter(await client()),
  plugins: [nextCookies()],

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      void sendEmail({
        to: user.email,
        subject: "Verify your email address",
        text: `Click to verify: ${url}`,
        html: `<h2>Email Verification</h2><a href="${url}">Verify Email</a>`,
      });
    },
    autoSignInAfterVerification: true,
  },

  socialProviders: {
    google: {
      enabled: true,
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowEmailLogin: true,
    }
  },
}); 