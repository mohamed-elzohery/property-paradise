import connectDB from "@/config/database";
import { fetchProperties } from "@/lib/data/properties";
import Property from "@/models/Property";

export const GET = async (
  request: Request,
  { params }: { params: { userId: string } }
) => {
  try {
    connectDB();
    const userId = params.userId;
    if (!userId) return new Response("user id is required", { status: 400 });
    const properties = await Property.find({ owner: userId });
    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    return new Response("something went wrong", { status: 500 });
  }
};
