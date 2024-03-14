"use server";

import connectDB from "@/config/database";
import { authOptions } from "@/lib/utils/auth";
import Message from "@/models/Message";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

interface FormState {
  message: string;
  success: boolean;
  isRead: boolean;
  callNumber: number;
}

export async function markAsRead(
  messageID: string,
  formState: FormState
): Promise<FormState> {
  const callNumber = formState.callNumber + 1;
  let isRead = formState.isRead;
  try {
    const session = await getServerSession(authOptions);
    if (session === null || !session.user?.id)
      return {
        message: "unregisitered user",
        success: false,
        callNumber,
        isRead,
      };
    await connectDB();
    const message = await Message.findById(messageID);
    if (message.receiver.toString() !== session.user.id)
      return {
        message: "unauthorized user",
        success: false,
        callNumber,
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
      callNumber,
      isRead: message.read,
    };
  } catch (error) {
    return {
      message: "failed to mark as read",
      success: false,
      callNumber,
      isRead: isRead,
    };
  }
}
