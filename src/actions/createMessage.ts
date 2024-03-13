"use server";
import { ZodIssue, z } from "zod";

const createMessageSchema = z.object({
  name: z.string().min(3, "name must be 3 chars at least"),
  body: z.string().min(10, "message must be 10 chars at least"),
  email: z.string().email("not a valid email"),
  phone: z.string(),
});

interface CreateMessageState {
  errors: {
    fieldsErrors: {
      name?: string[];
      body?: string[];
    };
    _form?: string[];
  };
  success: boolean;
}

export const createMessage = async (
  formState: CreateMessageState,
  formData: FormData
): Promise<CreateMessageState> => {
  const data = {
    name: formData.get("name"),
    body: formData.get("body"),
    phone: formData.get("phone"),
    email: formData.get("email"),
  };
  const result = createMessageSchema.safeParse(data);
  if (!result.success) {
    return {
      errors: {
        fieldsErrors: {
          name: result.error.flatten().fieldErrors.name,
          body: result.error.flatten().fieldErrors.body,
        },
      },
      success: false,
    };
  }
  console.log(result.data);
  return {
    errors: { fieldsErrors: {} },
    success: true,
  };
};
