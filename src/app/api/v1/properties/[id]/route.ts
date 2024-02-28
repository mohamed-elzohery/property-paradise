import connectDB from "@/config/database";
import { fetchProperties } from "@/lib/data/properties";
import Property from "@/models/Property";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    connectDB();
    const properties = await Property.findById(params.id);
    console.log(properties[0]);
    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    return new Response("something went wrong", { status: 500 });
  }
};
