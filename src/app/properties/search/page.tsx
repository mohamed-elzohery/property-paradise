import { fetchSearchedProperties } from "@/lib/data/search";
import PropertiesList from "@/ui/properties/PropertiesList";
import Link from "next/link";
import React from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";

interface PropertiesSearchPageProps {
  searchParams: {
    keyword: string;
    type: string;
  };
}

const PropertiesSearchPage: React.FC<PropertiesSearchPageProps> = async ({
  searchParams: { keyword, type },
}) => {
  if (!keyword && !type) {
    throw new Error("keyword or type must be provided");
  }
  const properties = await fetchSearchedProperties(keyword, type);
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <Link
          className="text-blue-500 flex items-center mb-4 hover:underline"
          href="/properties"
        >
          <FaArrowAltCircleLeft className="mr-2" /> Back to properties
        </Link>
        <h1 className="text-2xl font-bold mb-6 ">Search Results</h1>
        {properties.length === 0 ? (
          <p>No results for this search</p>
        ) : (
          <PropertiesList properties={properties} />
        )}
      </div>
    </section>
  );
};

export default PropertiesSearchPage;
