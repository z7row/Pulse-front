import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { cookies } from "next/headers";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" || account?.provider === "github") {
        try {
          const apiUrl = process.env.API_URL || "http://localhost:3000";

          const res = await fetch(`${apiUrl}/auth/social-login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: user.email,
              name: user.name,
              image: user.image,
              providerId: account.providerAccountId,
              provider: account.provider,
            }),
          });

          if (!res.ok) {
            const errorText = await res.text();
            console.error(`NestJS Auth Error [${res.status}]:`, errorText);
            return false;
          }

          const backendData = await res.json();
          const cookieStore = await cookies();

          cookieStore.set("access_token", backendData.accessToken, {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
          });

          return true;
        } catch (error) {
          console.error("Fetch Exception during Social Auth:", error);
          return false;
        }
      }
      return true;
    },
  },
});