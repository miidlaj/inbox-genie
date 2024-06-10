import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID as string,
        clientSecret: process.env.GOOGLE_SECRET as string,
        authorization: {
          params: {
            scope:
              "openid email profile https://www.googleapis.com/auth/gmail.readonly",
          },
        },
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: "/signin",
    },
  
    callbacks: {
      async jwt({ token, account, profile }) {
        if (account) {
          token.accessToken = account.access_token;
        }
        return token;
      },
  
  
      async session({ session, token }) {
        session.accessToken = token.accessToken;
        return session;
      },
  
    
    },
  };
  