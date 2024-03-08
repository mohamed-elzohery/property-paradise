import { fetchPropertyByID } from "@/lib/data/properties";
import { authOptions } from "@/lib/utils/auth";
import EditPropertyForm from "@/ui/properties/EditPropertyForm";
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
  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl md:py-24 py-8">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <EditPropertyForm property={property} />
        </div>
      </div>
    </section>
  );
};

export default EditPage;
