"use server";
import { redirect } from "next/navigation";

export const searchProperties = async (formData: FormData) => {
  const keyword = formData.get("keyword");
  const propertyType = formData.get("type");
  console.log(keyword, propertyType);
  if (!keyword && !propertyType) return redirect("/properties");
  redirect(`/properties/search?keyword=${keyword}&type=${propertyType}`);
};
