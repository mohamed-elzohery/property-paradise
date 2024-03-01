import { fetchPropertyByID } from "@/lib/data/properties";
import PropertyGallery from "@/ui/properties/PropertyHeader/PropertyGallery";
import PropertyHeader from "@/ui/properties/PropertyHeader/PropertyHeader";
import PropertyInfo from "@/ui/properties/PropertyHeader/PropertyInfo";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const property = await fetchPropertyByID(id);
  if (!property) notFound();
  return (
    <>
      <PropertyHeader
        imageSrc={property.images[0]}
        description={property.description}
      />
      <PropertyInfo property={property} />
      <PropertyGallery images={property.images} />
    </>
  );
};

export default page;
