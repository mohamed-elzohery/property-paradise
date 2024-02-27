import PropertiesList from "@/ui/properties/PropertiesList";
import React from "react";
import DUMMY_PROPERTIES from "@/assets/properties.json";

const PropertiesPage = () => {
  const properties = DUMMY_PROPERTIES;
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
          All Properties
        </h2>
        <PropertiesList properties={properties} />
      </div>
    </section>
  );
};

export default PropertiesPage;
