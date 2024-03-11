import { fetchProperties, fetchSavedProperties } from "@/lib/data/properties";
import PropertiesList from "@/ui/properties/PropertiesList";
import { notFound } from "next/navigation";
import React from "react";

const page = async () => {
  const properties = await fetchSavedProperties();
  if (!properties) return <h1>No proper fetched</h1>;
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto">
        {properties.length === 0 ? (
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            No Saved Properties
          </h2>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
              Saved Properties
            </h2>
            <PropertiesList properties={properties} />
          </>
        )}
      </div>
    </section>
  );
};

export default page;
