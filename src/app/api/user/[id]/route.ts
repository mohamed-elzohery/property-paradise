import connectDB from "@/config/database";
import User from "@/models/User";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();
    const userDetails = await User.findById(params.id);
    return new Response(JSON.stringify(userDetails), { status: 200 });
  } catch (error) {
    return new Response("something went wrong", { status: 500 });
  }
};
