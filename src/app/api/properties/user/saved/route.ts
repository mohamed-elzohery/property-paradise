import connectDB from "@/config/database";
import { authOptions } from "@/lib/utils/auth";
import Property from "@/models/Property";
import User from "@/models/User";
import { getServerSession } from "next-auth";

export const GET = async () => {
  try {
    const session = await getServerSession(authOptions);
    console.log("session", session);
    if (!session || !session.user)
      return new Response("user is not authorized", { status: 401 });
    const userId = session.user.id;
    await connectDB();
    const user = await User.findById(userId);
    const properties = await Property.find({
      _id: { $in: user.bookmarks },
    });
    console.log(user);
    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    return new Response("something went wrong", { status: 500 });
  }
};
