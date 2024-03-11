"use server";
import connectDB from "@/config/database";
import { authOptions } from "@/lib/utils/auth";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

interface FormState {
  message: string;
  isBookmarked: boolean;
  success: boolean;
  callNumber: number;
}

export async function bookmarkProperty(
  propertyID: string,
  formState: FormState
): Promise<FormState> {
  const callNumber = formState.callNumber + 1;
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session || !session.user)
      return {
        callNumber,
        isBookmarked: false,
        message: "user is not authorized",
        success: false,
      };

    const user = await User.findById(session.user.id);
    let message = "";
    let isBookmarked = user.bookmarks.includes(propertyID);
    if (isBookmarked) {
      user.bookmarks = user.bookmarks.filter(
        (id: string) => id.toString() !== propertyID
      );
      isBookmarked = false;
      message = "property is removed from bookmarks";
    } else {
      user.bookmarks = [...user.bookmarks, propertyID];
      isBookmarked = true;
      message = "property is added to bookmarks";
    }
    await user.save();
    revalidatePath("/properties/saved");
    return { callNumber, isBookmarked, message, success: true };
  } catch (error) {
    console.log(error);
    return {
      callNumber,
      isBookmarked: false,
      message: "something went wrong",
      success: false,
    };
  }
}
