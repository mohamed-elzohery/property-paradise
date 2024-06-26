import connectDB from "@/config/database";
import Property from "@/models/Property";

export const GET = async (
  request: Request,
  { params }: { params: { userId: string } }
) => {
  try {
    const userId = params.userId;
    if (!userId) return new Response("user id is required", { status: 400 });
    await connectDB();

    const properties = await Property.find({ owner: userId });
    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    return new Response("something went wrong", { status: 500 });
  }
};
