import Image from "next/image";
import React from "react";
import {
  FaBed,
  FaBath,
  FaMapMarked,
  FaRulerCombined,
  FaMoneyBill,
} from "react-icons/fa";
import { Property, Rates } from "@/types/properties/Property";

interface PropertCard {
  property: Property;
}

const getRentalRate = (rates: Rates) => {
  if (rates.monthly) return `${rates.monthly.toLocaleString()}/mo`;
  if (rates.weekly) return `${rates.weekly.toLocaleString()}/wk`;
  if (rates.nightly) return `${rates.nightly.toLocaleString()}/wk`;
};
const PropertyCard: React.FC<PropertCard> = ({
  property: {
    _id,
    baths,
    beds,
    images,
    location: { city, state },
    name,
    rates,
    square_feet,
    type,
    description,
  },
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md relative">
      <div className="h-60">
        <Image
          src={`/images/properties/${images[0]}`}
          alt={`${name}: ${description}`}
          className="object-cover rounded-t-xl !static"
          fill
        />
      </div>
      <div className="p-4">
        <div className="text-left md:text-center lg:text-left mb-6">
          <div className="text-gray-600">{type}</div>
          <h3 className="text-xl font-bold">{name}</h3>
        </div>
        <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
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
        <div className="border border-gray-100 mb-5" />
        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <FaMapMarked className="inline mr-2 text-orange-700 mt-1" />

            <span className="text-orange-700">
              {" "}
              {city} {state}{" "}
            </span>
          </div>
          <a
            href="property.html"
            className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Details
          </a>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
