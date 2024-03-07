import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET)
  throw new Error("missing Google credentials");

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/",
    signOut: "/",
  },

  callbacks: {
    // Invoked on successful signin
    async signIn({ user, account }) {
      // 1. Connect to database
      await connectDB();
      // 2. Check if user exists
      const userExists = await User.findOne({ email: user.email });
      // 3. If not, then add user to database
      if (!userExists) {
        // Truncate user name if too long
        const username = user.name?.slice(0, 20);

        const createdUser = await User.create({
          email: user.email,
          username,
          image: user.image,
        });
      }
      // 4. Return true to allow sign in
      return true;
    },
    // Modifies the session object
    async session({ session, token }) {
      try {
        if (session && token) {
          session.user!.id! = token.userId as string;
        }
        return session;
      } catch (error) {
        console.log("error occured", (error as any).message);
        return session;
      }
    },
    async jwt({ token }) {
      try {
        await connectDB();
        const user = await User.findOne({ email: token.email });
        if (!user) return token;
        token.userId = user.id.toString();
        return token;
      } catch (error) {
        console.log("error while creating token", error);
      }
      return token;
    },
  },
};

export const authHandler = NextAuth(authOptions);
