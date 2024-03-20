import Image from "next/image";
import React from "react";
import LogoImage from "@/assets/images/logo.png";
import { fetchProperties } from "@/lib/data/properties";
import { map } from "zod";
import FeaturedPropertyCard from "./FeaturedPropertyCard";

const FeathuredProperties = async () => {
  const featuredProperties = await fetchProperties({
    page: 1,
    pageSize: 2,
    query: { isFeatured: true },
  });
  if (!featuredProperties || featuredProperties.properties.length === 0)
    return <></>;
  return (
    <section className="bg-blue-50 px-4 pt-6 pb-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
          Featured Properties
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProperties.properties.map((property) => (
            <FeaturedPropertyCard
              property={property}
              key={property._id.toString()}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeathuredProperties;
