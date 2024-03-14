"use server";

import connectDB from "@/config/database";
import { authOptions } from "@/lib/utils/auth";
import Message from "@/models/Message";
import Property from "@/models/Property";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

interface FormState {
  message: string;
  success: boolean;
  callNumber: number;
}

export async function deleteListing(
  propertyID: string,
  formState: FormState
): Promise<FormState> {
  const callNumber = formState.callNumber + 1;
  console.log("formState,", formState);
  try {
    const session = await getServerSession(authOptions);
    if (session === null || !session.user?.id)
      return { message: "unregisitered user", success: false, callNumber };
    await connectDB();
    const property = await Property.findById(propertyID);
    if (property.owner.toString() !== session.user.id)
      return { message: "unauthorized user", success: false, callNumber };
    await property.deleteOne();
    // deleting all assiociated messages with this property
    await Message.deleteMany({ property: propertyID });
    revalidatePath("/messages");
    revalidatePath("/profile");
    return {
      message: "property deleted successfully",
      success: true,
      callNumber,
    };
  } catch (error) {
    return { message: "failed to delete listing", success: false, callNumber };
  }
}
