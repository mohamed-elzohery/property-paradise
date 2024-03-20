import Image from "next/image";
import React from "react";
import { getRentalRate, PropertyCard } from "../PropertyCard";
import { FaBath, FaBed, FaMoneyBill, FaRulerCombined } from "react-icons/fa";
import Link from "next/link";
import LogoImage from "@/assets/images/logo.png";

const FeaturedPropertyCard: React.FC<PropertyCard> = ({
  property: {
    _id,
    baths,
    beds,
    description,
    images,
    location: { city, state },
    name,
    rates,
    square_feet,
    type,
  },
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md flex flex-col md:flex-row">
      <div className="relative md:basis-1/2 md:h-auto h-60 basis-auto">
        <Image
          src={images[0] || LogoImage}
          fill
          alt={description}
          className="object-cover rounded-t-xl md:rounded-tr-none md:rounded-l-xl w-full md:w-2/5"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold">{name}</h3>
        <div className="text-gray-600 mb-4">{type}</div>
        <h3 className="absolute top-[10px] left-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
          {`$${getRentalRate(rates)}`}
        </h3>
        <div className="flex justify-center gap-4 text-gray-500 mb-4">
          <p>
            <FaBed className="inline mr-2" /> {beds}
            <span className="md:hidden lg:inline">Beds</span>
          </p>
          <p>
            <FaBath className="inline mr-2" /> {baths}
            <span className="md:hidden lg:inline">Baths</span>
          </p>
          <p>
            <FaRulerCombined className="inline mr-2" />
            {square_feet} <span className="md:hidden lg:inline">sqft</span>
          </p>
        </div>
        <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
          {rates.weekly && (
            <p>
              <FaMoneyBill className="inline mr-2" /> Weekly
            </p>
          )}
          {rates.monthly && (
            <p>
              <FaMoneyBill className="inline mr-2" /> Monthly
            </p>
          )}
          {rates.nightly && (
            <p>
              <FaMoneyBill className="inline mr-2" /> Nightly
            </p>
          )}
        </div>
        <div className="border border-gray-200 mb-5" />
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <i className="fa-solid fa-location-dot text-lg text-orange-700" />
            <span className="text-orange-700">
              {" "}
              {city} {state}
            </span>
          </div>
          <Link
            href={`/properties/${_id}`}
            className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPropertyCard;
