import connectDB from "@/config/database";
import User from "@/models/User";
import { AuthOptions, Profile, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
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
    async session({ session, token }) {
      // 1. Get user from database

      // 2. Assign the user id to the session
      // 3. return session
      return session;
    },
  },
};
