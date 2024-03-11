import connectDB from "@/config/database";
import { authOptions } from "@/lib/utils/auth";
import User from "@/models/User";
import { getServerSession } from "next-auth";

export const dynamic = "force-dynamic";

export const POST = async (request: Request) => {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session || !session.user)
      return new Response("user is not authorized", { status: 401 });
    const { propertyID } = await request.json();
    if (!propertyID)
      return new Response("property id is required", { status: 400 });
    const user = await User.findById(session.user.id);
    let message = "";
    let isBookmarked = user.bookmarks.includes(propertyID);
    if (isBookmarked) {
      user.bookmarks = user.bookmarks.filter((id: string) => id !== propertyID);
      isBookmarked = false;
      message = "property is removed from bookmarks";
    } else {
      user.bookmarks = [...user.bookmarks, propertyID];
      isBookmarked = true;
      message = "property is added to bookmarks";
    }
    await user.save();
    return new Response(JSON.stringify({ message, isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("server error", { status: 500 });
  }
};
