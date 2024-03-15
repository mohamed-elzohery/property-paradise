"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface PaginationProps {
  totalDocs: number;
  page: number;
  pageSize: number;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  pageSize,
  totalDocs,
}) => {
  const totalPages = Math.ceil(totalDocs / pageSize);
  const pathname = usePathname();
  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      {page !== 1 && (
        <Link
          href={`${pathname}?page=${page - 1}&pageSize=${pageSize}`}
          className="mr-2 px-2 py-1 border border-gray-300 rounded"
        >
          Previous
        </Link>
      )}
      <span className="mx-2">
        Page {page} of {totalPages}
      </span>
      {page !== totalPages && (
        <Link
          href={`${pathname}?page=${page + 1}&pageSize=${pageSize}`}
          className="ml-2 px-2 py-1 border border-gray-300 rounded"
        >
          Next
        </Link>
      )}
    </section>
  );
};

export default Pagination;
