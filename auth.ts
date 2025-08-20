import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Resend from "next-auth/providers/resend"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt", // Use JWT for middleware compatibility
  },
  pages: {
    signIn: "/signin",
    error: "/signin", // Redirect errors back to signin page
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: process.env.EMAIL_FROM || "onboarding@resend.dev",
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
      }
      return session
    },
    redirect({ url, baseUrl }) {
      // Always redirect to home page after successful sign in
      if (url.startsWith("/") && !url.includes("/signin") && !url.includes("/signup")) {
        return baseUrl
      }
      return baseUrl
    },
  },
})

