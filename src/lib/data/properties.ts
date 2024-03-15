import connectDB from "@/config/database";
import PropertyModel from "@/models/Property";
import { Property } from "@/types/properties/Property";
import { headers } from "next/headers";

export const fetchProperties = async ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) => {
  try {
    await connectDB();
    const skip = (page - 1) * pageSize;
    const total = await PropertyModel.countDocuments({});
    const properties = (await PropertyModel.find({})
      .skip(skip)
      .limit(pageSize)) as Property[];
    return { total, properties };
  } catch (error) {
    console.log(error);
    return { total: 0, properties: [] };
  }
};

export const fetchHomeProperties = async () => {
  try {
    await connectDB();
    const total = await PropertyModel.countDocuments({});
    const random = Math.floor(Math.random() * total);
    const properties = await PropertyModel.find({}).limit(3);
    return properties.sort(() => Math.random() - Math.random()) as Property[];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchSavedProperties = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/properties/user/saved`,
      { headers: headers() }
    );
    if (!response.ok) throw new Error("failed to fetch user saved properties");

    return (await response.json()) as Property[];
  } catch (error) {
    console.log(error);
  }
};

export const fetchPropertyByID = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/properties/${id}`
    );
    if (!response.ok) throw new Error("failed to fetch prop");

    return (await response.json()) as Property;
  } catch (error) {
    console.log(error);
  }
};

export const fetchPropertiesByUserID = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/properties/user/${id}`
    );
    if (!response.ok) throw new Error("failed to fetch user properties");

    return (await response.json()) as Property[];
  } catch (error) {
    console.log(error);
  }
};
