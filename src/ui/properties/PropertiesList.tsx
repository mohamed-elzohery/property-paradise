import React from "react";
import properties from "@/assets/properties.json";
import { Property } from "@/types/properties/Property";
import PropertyCard from "./PropertyCard";

const PropertiesList = () => {
  const allProps = properties as Property[];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {allProps.map((property) => (
        <PropertyCard property={property} key={property._id} />
      ))}
    </div>
  );
};

export default PropertiesList;
