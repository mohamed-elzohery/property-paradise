import { deleteListing } from "@/actions";
import { Property } from "@/types/properties/Property";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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
        <form className="inline-block" action={deleteListing.bind(null, _id)}>
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
