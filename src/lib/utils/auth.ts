import connectDB from "@/config/database";
import User from "@/models/User";
import NextAuth, { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET)
  throw new Error("missing Google credentials");

const authOptions: NextAuthConfig = {
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
    async signIn({ user }) {
      // 1. Connect to database
      await connectDB();
      // 2. Check if user exists
      const userExists = await User.findOne({ email: user.email });
      // 3. If not, then add user to database
      if (!userExists) {
        // Truncate user name if too long
        const username = user.name?.slice(0, 20);

        await User.create({
          email: user.email,
          username,
          image: user.image,
        });
      }
      // 4. Return true to allow sign in
      return true;
    },
    // Modifies the session object
    async session({ session }) {
      try {
        console.log("session is", session);
        await connectDB();
        // 1. Get user from database
        const user = await User.findOne({ email: session.user?.email });
        if (!user) return session;
        // 2. Assign the user id to the session
        session.user.id = user.id.toString();
        // 3. return session
        return session;
      } catch (error) {
        console.log("error occured", (error as any).message);
        return session;
      }
    },
  },
};

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth(authOptions);
