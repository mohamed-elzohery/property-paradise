"use client";
import { deleteListing } from "@/actions";
import { Property } from "@/types/properties/Property";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "react-toastify";

interface ListingCardProps {
  property: Property;
}

const LisitngCard: React.FC<ListingCardProps> = ({
  property: {
    _id,
    description,
    images,
    name,
    location: { street },
  },
}) => {
  const [formState, action] = useFormState(deleteListing.bind(null, _id), {
    message: "",
    success: false,
    callNumber: 0,
  });

  console.log(formState);

  useEffect(() => {
    if (formState.callNumber === 0) return;
    if (formState.success) toast.success(formState.message);
    else toast.error(formState.message);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState.callNumber]);

  return (
    <div className="mb-10  w-full " key={_id}>
      <Link href={`/properties/${_id}`} className="relative block h-60 w-100">
        <Image
          className="rounded-md object-cover"
          src={images[0]}
          alt={description}
          fill
        />
      </Link>
      <div className="mt-2">
        <p className="text-lg font-semibold">{name}</p>
        <p className="text-gray-600">Address: {street}</p>
      </div>
      <div className="mt-2">
        <a
          href={`/properties/${_id}/edit`}
          className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
        >
          Edit
        </a>
        <form className="inline-block" action={action}>
          <button
            className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
            type="submit"
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  );
};

export default LisitngCard;
