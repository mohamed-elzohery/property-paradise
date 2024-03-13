"use server";
import { authOptions } from "@/lib/utils/auth";
import Message from "@/models/Message";
import { getServerSession } from "next-auth";
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
    _form?: string;
  };
  success: boolean;
  callbackNumber: number;
}

export const createMessage = async (
  { propertyID, receiverID }: { receiverID: string; propertyID: string },
  formState: CreateMessageState,
  formData: FormData
): Promise<CreateMessageState> => {
  const callbackNumber = formState.callbackNumber + 1;
  console.log(formData);
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
      callbackNumber,
    };
  }
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user)
      return {
        errors: {
          fieldsErrors: {},
          _form: "please login to send a message",
        },
        success: false,
        callbackNumber,
      };
    if (receiverID === session.user.id)
      return {
        callbackNumber,
        errors: { fieldsErrors: {}, _form: "cannot send message to your self" },
        success: false,
      };
    const message = new Message({
      sender: session.user.id,
      receiver: receiverID,
      name: data.name,
      body: data.body,
      email: data.email,
      phone: data.phone,
      property: propertyID,
    });
    await message.save();
    return {
      errors: { fieldsErrors: {}, _form: "Message is send successfully" },
      success: true,
      callbackNumber,
    };
  } catch (error) {
    return {
      errors: { fieldsErrors: {}, _form: "Something went wrong" },
      success: false,
      callbackNumber,
    };
  }
};
