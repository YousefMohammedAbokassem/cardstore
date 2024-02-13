import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { LOGIN } from "@/app/[lng]/components/lib/apis";
export const authOption = {
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},

      async authorize(credentials) {
        // const { phone, country_code, password } = credentials;

        const response = await axios.post(LOGIN, {
          country_code: credentials?.country_code,
          phone: credentials?.phone,
          password: credentials?.password, // Make sure to send the actual password string
        });
        const req = response.data;
        console.log(req);
        if (req.status === true) {
          return req;
        } else {
          console.log(req);
          return req.error;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};
const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
