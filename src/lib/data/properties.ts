import { Property } from "@/types/properties/Property";

export const fetchProperties = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/properties`
    );
    console.log(process.env.NEXT_PUBLIC_API_DOMAIN);
    if (!response.ok) throw new Error("failed to fetch props");

    return response.json();
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
