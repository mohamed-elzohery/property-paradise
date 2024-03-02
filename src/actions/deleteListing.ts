"use server";

import connectDB from "@/config/database";
import { auth } from "@/lib/utils/auth";
import Property from "@/models/Property";
import { revalidatePath } from "next/cache";

export async function deleteListing(propertyID: string) {
  try {
    const session = await auth();
    if (session === null || !session.user?.id)
      return { message: "unregisitered user" };
    await connectDB();
    const property = await Property.findById(propertyID);
    if (property.owner.toString() !== session.user.id)
      return { message: "unauthorized user" };
    await property.deleteOne();
    revalidatePath("/profile");
  } catch (error) {
    return { message: "failed to delete listing" };
  }
}
