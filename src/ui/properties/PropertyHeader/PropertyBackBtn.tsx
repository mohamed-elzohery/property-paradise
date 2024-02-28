import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const PropertyBackBtn = () => {
  return (
    <section>
      <div className="container m-auto py-6 px-6">
        <Link
          href="/properties"
          className="text-blue-500 hover:text-blue-600 flex items-center"
        >
          <FaArrowLeft className="fas fa-arrow-left mr-2" /> Back to Properties
        </Link>
      </div>
    </section>
  );
};

export default PropertyBackBtn;
