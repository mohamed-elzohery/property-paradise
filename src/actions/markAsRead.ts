"use server";

import connectDB from "@/config/database";
import { authOptions } from "@/lib/utils/auth";
import Message from "@/models/Message";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

interface FormState {
  message: string | null;
  success: boolean;
  isRead: boolean;
}

export async function markAsRead(
  messageID: string,
  formState: FormState
): Promise<FormState> {
  let isRead = formState.isRead;
  try {
    const session = await getServerSession(authOptions);
    if (session === null || !session.user?.id)
      return {
        message: "unregisitered user",
        success: false,
        isRead,
      };
    await connectDB();
    const message = await Message.findById(messageID);
    if (message.receiver.toString() !== session.user.id)
      return {
        message: "unauthorized user",
        success: false,
        isRead,
      };
    message.read = !isRead;
    await message.save();

    revalidatePath("/messages");
    // revalidatePath("/profile");
    return {
      message: message.read
        ? "message is marked as read"
        : "message is marked as unread",
      success: true,
      isRead: message.read,
    };
  } catch (error) {
    return {
      message: "failed to mark as read",
      success: false,
      isRead: isRead,
    };
  }
}
