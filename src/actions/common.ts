import cloudinary from "@/config/cloudinary";
import { ZodIssue, z } from "zod";
export interface CreateSchemaFormState {
  errors: {
    fieldsErrors?: ZodIssue[];
    _form?: string[];
  };
}

export const getImageBase64 = async (image: File) => {
  const imageBuffer = await image.arrayBuffer();
  const imageArray = Array.from(new Uint8Array(imageBuffer));
  const imageData = Buffer.from(imageArray);

  const imageBase = imageData.toString("base64");
  return imageBase;
};

export const uploadImageToCloudinary = async (base64: string) => {
  const imageUpload = cloudinary.uploader.upload(
    `data:image/png;base64,${base64}`,
    {
      folder: process.env.CLOUDINARY__FOLDER_NAME,
    }
  );
  return imageUpload;
};

export const savePropertyImagesToCloudinary = async (images: File[]) => {
  const imageUploadArray = await Promise.all<string>(
    images.map(async (image: File) => {
      const base64 = await getImageBase64(image);
      const result = await uploadImageToCloudinary(base64);
      return result.secure_url;
    })
  );
  return imageUploadArray;
};

export const createPropertySchema = z.object({
  name: z.string().min(3, "name must be 3 chars at least"),
  description: z.string().min(10, "description must be 10 chars at least"),
  type: z.enum([
    "Apartment",
    "Condo",
    "House",
    "Cabin Or Cottage",
    "Room",
    "Studio",
    "Other",
  ]),
  location: z.object({
    street: z.string().min(1, "street is required"),
    city: z.string().min(1, "city is required"),
    state: z.string().min(1, "state is required"),
    zipcode: z.string().min(1, "zipcode is required"),
  }),
  beds: z.string().min(1, "beds number is required"),
  baths: z.string().min(1, "baths number is required"),
  square_feet: z.string().min(1, "square feet is required"),
  amenities: z.array(z.string()),
  rates: z.object({
    weekly: z.string().nullable(),
    nightly: z.string().nullable(),
    monthly: z.string().nullable(),
  }),
  seller_info: z.object({
    email: z
      .string()
      .min(1, "seller email is required")
      .email("invalid seller email address"),
    name: z.string().min(1, "seller name is required"),
    phone: z.string().min(1, "seller phone is required"),
  }),
  images: z.array(z.any()).max(4, "cannot upload more than 4 images"),
});
