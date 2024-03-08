"use server";

import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import { authOptions } from "@/lib/utils/auth";
import Property from "@/models/Property";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { json } from "stream/consumers";
import { ZodIssue, z } from "zod";
import {
  CreateSchemaFormState,
  createPropertySchema,
  savePropertyImagesToCloudinary,
} from "./createProperty";

export const editProperty = async (
  newPayload: FormData,
  formState: CreateSchemaFormState,
  formData: FormData
): Promise<CreateSchemaFormState> => {
  const data = {
    name: formData.get("name"),
    description: formData.get("description"),
    type: formData.get("type"),
    location: {
      street: formData.get("location.street") || "",
      city: formData.get("location.city") || "",
      state: formData.get("location.state") || "",
      zipcode: formData.get("location.zipcode") || "",
    },
    beds: formData.get("beds") || "",
    baths: formData.get("baths") || "",
    square_feet: formData.get("square_feet") || "",
    amenities: formData.getAll("amenities"),
    rates: {
      nightly: formData.get("rates.nightly") || null,
      monthly: formData.get("rates.monthly") || null,
      weekly: formData.get("rates.weekly") || null,
    },

    seller_info: {
      email: formData.get("seller_info.email") || "",
      name: formData.get("seller_info.name") || "",
      phone: formData.get("seller_info.phone"),
    },
    images: (newPayload.getAll("uploadedImage") as File[]).filter(
      ({ size }) => size !== 0
    ),
  };

  const result = createPropertySchema.safeParse(data);
  if (!result.success) {
    return {
      errors: { fieldsErrors: result.error.errors },
    };
  }

  try {
    const session = await getServerSession(authOptions);
    const proepryId = newPayload.get("id");
    const property = await Property.findById(proepryId);
    if (!session === null) throw new Error("user is not logged in");
    if (property.owner.toString() !== session?.user.id)
      throw new Error("user is not authorized");
    const recievedImages = newPayload.getAll("savedImage");

    let imagesURLs;
    if (data.images.length !== 0)
      imagesURLs = await savePropertyImagesToCloudinary(data.images);
    await Property.findByIdAndUpdate(property.id, {
      ...data,
      images: [recievedImages, imagesURLs],
      owner: session?.user?.id,
    });

    // delete unused image
    const prevImages = property.images;
    if (prevImages && prevImages.length !== 0) {
      await prevImages.forEach(async (img: string) => {
        if (!recievedImages.includes(img)) {
          await cloudinary.uploader.destroy(extractFileName(img));
        }
      });
    }
  } catch (error: unknown) {
    if (error instanceof Error) return { errors: { _form: [error.message] } };
    else return { errors: { _form: ["Something went wrong"] } };
  }
  revalidatePath("/properties");
  redirect("/properties");
};
