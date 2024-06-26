import React from "react";
import PropertiesList from "./PropertiesList";
import DUMMY_PROPS from "@/assets/properties.json";
import Link from "next/link";
import { fetchHomeProperties } from "@/lib/data/properties";

const HomeProperties = async () => {
  const properties = await fetchHomeProperties();

  return (
    <>
      <section className="px-4 py-6 mt-6">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Recent Properties
          </h2>
          <PropertiesList properties={properties} />
        </div>
      </section>
      <section className="m-auto max-w-lg my-10 px-6">
        <Link
          href="/properties"
          className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
          View All Properties
        </Link>
      </section>
    </>
  );
};

export default HomeProperties;
