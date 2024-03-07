import connectDB from "@/config/database";
import { fetchProperties } from "@/lib/data/properties";
import Property from "@/models/Property";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();
    const properties = await Property.findById(params.id);
    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    return new Response("something went wrong", { status: 500 });
  }
};
