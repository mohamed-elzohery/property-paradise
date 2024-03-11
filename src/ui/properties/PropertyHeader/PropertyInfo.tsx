import { Property } from "@/types/properties/Property";
import React from "react";
import {
  FaBed,
  FaMapMarker,
  FaBath,
  FaRulerCombined,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import BookmarkButton from "../PropertyAside/BookmarkButton";
import ShareButtons from "../PropertyAside/ShareButtons";
import PropertyContactForm from "../PropertyAside/PropertyContactForm";

interface PropertyInfoProps {
  property: Property;
}

const PropertyInfo: React.FC<PropertyInfoProps> = ({ property }) => {
  return (
    <>
      {/* Property Info */}
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 lg:grid-cols-8 w-full gap-6">
            <main className="lg:col-span-6">
              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <div className="text-gray-500 mb-4">{property.type}</div>
                <h1 className="text-3xl font-bold mb-4">{property.name}</h1>
                <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                  <i className="fa-solid fa-location-dot text-lg text-orange-700 mr-2" />
                  <p className="text-orange-700">
                    <FaMapMarker className="inline" />{" "}
                    {`${property.location.street} ${property.location.city}, ${property.location.state} ${property.location.zipcode}`}
                  </p>
                </div>
                <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">
                  Rates &amp; Options
                </h3>
                <div className="flex flex-col md:flex-row justify-around">
                  <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
                    <div className="text-gray-500 mr-2 font-bold">Nightly</div>
                    {property.rates.nightly ? (
                      <div className="text-2xl font-bold text-blue-500">
                        ${property.rates.nightly.toLocaleString()}
                      </div>
                    ) : (
                      <FaTimes className="fa fa-xmark text-red-700" />
                    )}
                  </div>
                  <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
                    <div className="text-gray-500 mr-2 font-bold">Weekly</div>
                    {property.rates.weekly ? (
                      <div className="text-2xl font-bold text-blue-500">
                        ${property.rates.weekly.toLocaleString()}
                      </div>
                    ) : (
                      <FaTimes className="fa fa-xmark text-red-700" />
                    )}
                  </div>
                  <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
                    <div className="text-gray-500 mr-2 font-bold">Monthly</div>
                    {property.rates.monthly ? (
                      <div className="text-2xl font-bold text-blue-500">
                        ${property.rates.monthly.toLocaleString()}
                      </div>
                    ) : (
                      <FaTimes className="fa fa-xmark text-red-700" />
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-lg font-bold mb-6">
                  Description &amp; Details
                </h3>
                <div className="flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9">
                  <p>
                    <FaBed className="mr-2 inline" /> {property.beds}
                    <span className="hidden sm:inline">Beds</span>
                  </p>
                  <p>
                    <FaBath className="mr-2 inline" /> {property.baths}
                    <span className="hidden sm:inline">Baths</span>
                  </p>
                  <p>
                    <FaRulerCombined className="mr-2 inline" />
                    {property.square_feet}{" "}
                    <span className="hidden sm:inline">sqft</span>
                  </p>
                </div>

                <p className="text-gray-500 mb-4 md:text-center">
                  {property.description}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-lg font-bold mb-6">Amenities</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none space-y-2">
                  {property.amenities.map((amenity) => (
                    <li key={amenity}>
                      <FaCheck className="inline text-green-600 mr-2 "></FaCheck>{" "}
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <div id="map" />
              </div>
            </main>
            <aside className="space-y-4 lg:col-span-2">
              <BookmarkButton property={property} />
              <ShareButtons property={property} />
              <PropertyContactForm property={property} />
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default PropertyInfo;
