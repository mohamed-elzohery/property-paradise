"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ZodIssue, z } from "zod";

interface CreateSchemaFormState {
  errors: {
    fieldsErrors?: ZodIssue[];
    _form?: string[];
  };
}

const createPropertySchema = z.object({
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
  street: z.string().min(1, "street is required"),
  city: z.string().min(1, "city is required"),
  state: z.string().min(1, "state is required"),
  zipcode: z.string().min(1, "zipcode is required"),
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
    phone: z
      .string()
      .regex(/^\+(?:[0-9]●?){6,14}[0-9]$/, "seller phone number is invalid")
      .min(1, "seller phone is required"),
  }),
  images: z.array(z.any()),
});

export const createProperty = async (
  formState: CreateSchemaFormState,
  formData: FormData
): Promise<CreateSchemaFormState> => {
  const data = {
    name: formData.get("name"),
    description: formData.get("description"),
    type: formData.get("type"),
    street: formData.get("street") || "",
    city: formData.get("city") || "",
    state: formData.get("state") || "",
    zipcode: formData.get("zipcode") || "",
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
      email: formData.get("seller_info.email"),
      name: formData.get("seller_info.name"),
      phone: formData.get("seller_info.phone"),
    },
    images: (formData.getAll("images") as File[]).filter(
      ({ size }) => size !== 0
    ),
  };
  const result = createPropertySchema.safeParse(data);
  console.log(data);
  if (!result.success) {
    return {
      errors: { fieldsErrors: result.error.errors },
    };
  }

  try {
  } catch (error: unknown) {
    if (error instanceof Error) return { errors: { _form: [error.message] } };
    else return { errors: { _form: ["Something went wrong"] } };
  }
  revalidatePath("/properties");
  redirect("/properties");
};

createProperty;
