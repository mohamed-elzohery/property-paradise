"use server";

import connectDB from "@/config/database";
import { authOptions } from "@/lib/utils/auth";
import Message from "@/models/Message";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

interface FormState {
  message: string | null;
  success: boolean;
}

export async function deleteMessage(
  messageID: string,
  formState: FormState
): Promise<FormState> {
  try {
    const session = await getServerSession(authOptions);
    if (session === null || !session.user?.id)
      return {
        message: "unregisitered user",
        success: false,
      };
    await connectDB();
    const message = await Message.findById(messageID);
    if (message.receiver.toString() !== session.user.id)
      return {
        message: "unauthorized user",
        success: false,
      };
    await message.deleteOne();

    revalidatePath("/messages");
    // revalidatePath("/profile");
    return {
      message: "message is deleted",
      success: true,
    };
  } catch (error) {
    return {
      message: "failed to delete the message",
      success: false,
    };
  }
}
