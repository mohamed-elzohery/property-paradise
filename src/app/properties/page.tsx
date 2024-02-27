import PropertiesList from "@/ui/properties/PropertiesList";
import React from "react";

const PropertiesPage = () => {
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
          Recent Properties
        </h2>
        <PropertiesList />
      </div>
    </section>
  );
};

export default PropertiesPage;
