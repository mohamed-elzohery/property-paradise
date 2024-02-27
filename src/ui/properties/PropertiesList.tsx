import React from "react";
import properties from "@/assets/properties.json";
import { Property } from "@/types/properties/Property";
import PropertyCard from "./PropertyCard";

interface PropertiesListProps {
  properties: Property[];
}

const PropertiesList: React.FC<PropertiesListProps> = ({ properties }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard property={property} key={property._id} />
      ))}
    </div>
  );
};

export default PropertiesList;
