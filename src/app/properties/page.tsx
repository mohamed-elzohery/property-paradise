import PropertiesList from "@/ui/properties/PropertiesList";
import React from "react";
import { fetchProperties } from "@/lib/data/properties";
import Pagination from "@/ui/pagination/Pagination";

const PropertiesPage = async ({
  searchParams,
}: {
  searchParams?: {
    pageSize?: string;
    page?: string;
  };
}) => {
  const currentPage = Number(searchParams?.page) || 1;
  const currentPageSize = Number(searchParams?.pageSize) || 10;
  const response = await fetchProperties({
    page: currentPage,
    pageSize: currentPageSize,
  });

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
          All Properties
        </h2>
        <PropertiesList properties={response.properties} />
        <Pagination
          page={currentPage}
          pageSize={currentPageSize}
          totalDocs={response.total}
        />
      </div>
    </section>
  );
};

export default PropertiesPage;
