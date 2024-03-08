import { fetchPropertyByID } from "@/lib/data/properties";
import { authOptions } from "@/lib/utils/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";

interface EditPageProps {
  params: { id: string };
}

const EditPage: React.FC<EditPageProps> = async ({ params: { id } }) => {
  const property = await fetchPropertyByID(id);
  const session = await getServerSession(authOptions);
  if (!property || !session) return notFound();
  if (property.owner.toString() !== session.user.id) return notFound();
  return <div>{property.name}</div>;
};

export default EditPage;
