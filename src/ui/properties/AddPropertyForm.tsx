"use client";
import { createProperty } from "@/actions";
import Image from "next/image";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import { FaTrash } from "react-icons/fa";
import { SubmitButton } from "../button/SubmitButton";

interface ImagePreview {
  src: string;
  isSaved: boolean;
  name: string;
}

const createFormDataFromArray = (images: File[]) => {
  const formData = new FormData();
  images.forEach((imageFile) => {
    formData.append("images", imageFile);
  });
  return formData;
};

const AddPropertyForm = () => {
  const [imagesPreviewed, setImagesPreviewed] = useState<File[]>([]);
  const [state, action] = useFormState(
    createProperty.bind(null, createFormDataFromArray(imagesPreviewed)),
    {
      errors: {},
    }
  );
  console.log(imagesPreviewed);
  return (
    <form action={action}>
      <h2 className="text-3xl text-center font-semibold mb-6">Add Property</h2>
      <div className="mb-4">
        <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
          Property Type
        </label>
        <select
          id="type"
          name="type"
          className="border rounded w-full py-2 px-3"
        >
          <option value="Apartment">Apartment</option>
          <option value="Condo">Condo</option>
          <option value="House">House</option>
          <option value="Cabin Or Cottage">Cabin or Cottage</option>
          <option value="Room">Room</option>
          <option value="Studio">Studio</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Listing Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={""}
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="eg. Beautiful Apartment In Miami"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 font-bold mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="border rounded w-full py-2 px-3"
          rows={4}
          placeholder="Add an optional description of your property"
          defaultValue={""}
        />
      </div>
      <div className="mb-4 bg-blue-50 p-4">
        <label className="block text-gray-700 font-bold mb-2">Location</label>
        <input
          type="text"
          id="street"
          name="location.street"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="Street"
          defaultValue={""}
        />
        <input
          type="text"
          id="city"
          name="location.city"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="City"
          defaultValue={""}
        />
        <input
          type="text"
          id="state"
          name="location.state"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="State"
          defaultValue={""}
        />
        <input
          type="text"
          id="zipcode"
          name="location.zipcode"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="Zipcode"
          defaultValue={""}
        />
      </div>
      <div className="mb-4 flex flex-wrap">
        <div className="w-full sm:w-1/3 pr-2">
          <label htmlFor="beds" className="block text-gray-700 font-bold mb-2">
            Beds
          </label>
          <input
            type="number"
            id="beds"
            defaultValue={""}
            name="beds"
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className="w-full sm:w-1/3 px-2">
          <label htmlFor="baths" className="block text-gray-700 font-bold mb-2">
            Baths
          </label>
          <input
            type="number"
            id="baths"
            defaultValue={""}
            name="baths"
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className="w-full sm:w-1/3 pl-2">
          <label
            htmlFor="square_feet"
            className="block text-gray-700 font-bold mb-2"
          >
            Square Feet
          </label>
          <input
            type="number"
            defaultValue={1}
            id="square_feet"
            min={1}
            name="square_feet"
            className="border rounded w-full py-2 px-3"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Amenities</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          <div>
            <input
              type="checkbox"
              id="amenity_wifi"
              name="amenities"
              defaultValue="Wifi"
              className="mr-2"
            />
            <label htmlFor="amenity_wifi">Wifi</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_kitchen"
              name="amenities"
              defaultValue="Full Kitchen"
              className="mr-2"
            />
            <label htmlFor="amenity_kitchen">Full kitchen</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_washer_dryer"
              name="amenities"
              defaultValue="Washer & Dryer"
              className="mr-2"
            />
            <label htmlFor="amenity_washer_dryer">Washer &amp; Dryer</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_free_parking"
              name="amenities"
              defaultValue="Free Parking"
              className="mr-2"
            />
            <label htmlFor="amenity_free_parking">Free Parking</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_pool"
              name="amenities"
              defaultValue="Swimming Pool"
              className="mr-2"
            />
            <label htmlFor="amenity_pool">Swimming Pool</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_hot_tub"
              name="amenities"
              defaultValue="Hot Tub"
              className="mr-2"
            />
            <label htmlFor="amenity_hot_tub">Hot Tub</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_24_7_security"
              name="amenities"
              defaultValue="24/7 Security"
              className="mr-2"
            />
            <label htmlFor="amenity_24_7_security">24/7 Security</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_wheelchair_accessible"
              name="amenities"
              defaultValue="Wheelchair Accessible"
              className="mr-2"
            />
            <label htmlFor="amenity_wheelchair_accessible">
              Wheelchair Accessible
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_elevator_access"
              name="amenities"
              defaultValue="Elevator Access"
              className="mr-2"
            />
            <label htmlFor="amenity_elevator_access">Elevator Access</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_dishwasher"
              name="amenities"
              defaultValue="Dishwasher"
              className="mr-2"
            />
            <label htmlFor="amenity_dishwasher">Dishwasher</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_gym_fitness_center"
              name="amenities"
              defaultValue="Gym/Fitness Center"
              className="mr-2"
            />
            <label htmlFor="amenity_gym_fitness_center">
              Gym/Fitness Center
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_air_conditioning"
              name="amenities"
              defaultValue="Air Conditioning"
              className="mr-2"
            />
            <label htmlFor="amenity_air_conditioning">Air Conditioning</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_balcony_patio"
              name="amenities"
              defaultValue="Balcony/Patio"
              className="mr-2"
            />
            <label htmlFor="amenity_balcony_patio">Balcony/Patio</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_smart_tv"
              name="amenities"
              defaultValue="Smart TV"
              className="mr-2"
            />
            <label htmlFor="amenity_smart_tv">Smart TV</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_coffee_maker"
              name="amenities"
              defaultValue="Coffee Maker"
              className="mr-2"
            />
            <label htmlFor="amenity_coffee_maker">Coffee Maker</label>
          </div>
        </div>
      </div>
      <div className="mb-4 bg-blue-50 p-4">
        <label className="block text-gray-700 font-bold mb-2">
          Rates (Leave blank if not applicable)
        </label>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <div className="flex items-center">
            <label htmlFor="weekly_rate" className="mr-2">
              Weekly
            </label>
            <input
              type="number"
              defaultValue={""}
              id="weekly_rate"
              name="rates.weekly"
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="monthly_rate" className="mr-2">
              Monthly
            </label>
            <input
              type="number"
              id="monthly_rate"
              defaultValue={""}
              name="rates.monthly"
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="nightly_rate" className="mr-2">
              Nightly
            </label>
            <input
              type="number"
              id="nightly_rate"
              defaultValue={""}
              name="rates.nightly"
              className="border rounded w-full py-2 px-3"
            />
          </div>
        </div>
      </div>
      <div className="mb-4">
        <label
          htmlFor="seller_name"
          className="block text-gray-700 font-bold mb-2"
        >
          Seller Name
        </label>
        <input
          type="text"
          id="seller_name"
          name="seller_info.name"
          defaultValue={""}
          className="border rounded w-full py-2 px-3"
          placeholder="Name"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="seller_email"
          className="block text-gray-700 font-bold mb-2"
        >
          Seller Email
        </label>
        <input
          type="text"
          defaultValue={""}
          id="seller_email"
          name="seller_info.email"
          className="border rounded w-full py-2 px-3"
          placeholder="Email address"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="seller_phone"
          className="block text-gray-700 font-bold mb-2"
        >
          Seller Phone
        </label>
        <input
          type="tel"
          id="seller_phone"
          name="seller_info.phone"
          defaultValue={""}
          className="border rounded w-full py-2 px-3"
          placeholder="Phone"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="images" className="text-gray-700 font-bold mb-2">
          <div className="h-[200px] my-6 cursor-pointer w-100  outline-dashed outline-gray-200 rounded-lg flex space-y-4 justify-center items-center">
            <div className="flex flex-col space-y-4 justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width={100}
                fill="#DDD"
              >
                <path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" />
              </svg>
              <span className="">Add Images (Select up to 4 images)</span>
            </div>
          </div>
        </label>
        <input
          type="file"
          id="images"
          className="border rounded w-full py-2 px-3 hidden"
          accept="image/*"
          multiple={true}
          maxLength={4}
          onChange={(e) => {
            const files = e.target.files;
            if (!files || files.length === 0) return;
            Array.from(files).forEach((file) => {
              setImagesPreviewed((prev) => [...prev, file]);
            });
          }}
        />
      </div>
      <div className="fluid-grid gap-6 mt-6 ">
        {imagesPreviewed.map((file) => (
          <div
            className="group rounded-lg shadow-md overflow-hidden border border-gray-200 relative h-[300px]"
            key={file.name}
          >
            <Image
              alt={"none"}
              src={URL.createObjectURL(file)}
              fill
              className="transition-all duration-300 md:group-hover:brightness-75	"
            />
            <button
              onClick={() => {
                setImagesPreviewed((prev) =>
                  prev.filter(({ name: n }) => n !== file.name)
                );
              }}
              className="flex space-x-3 justify-center items-center absolute top-5 right-5 cursor-pointer p-4 md:max-w-40 bg-red-500 rounded-md md:group-hover:flex md:top-[50%] md:left-[50%] md:-translate-x-[50%] md:translate-y-[150%] md:opacity-0 md:group-hover:opacity-100 md:group-hover:-translate-y-[50%] duration-300 transition-all"
            >
              <FaTrash className="fill-white" />
              <p className="text-white hidden md:block">Delete</p>
            </button>
          </div>
        ))}
      </div>
      <div>
        {state.errors.fieldsErrors !== undefined && (
          <p className="my-4 text-red-600">
            *{state.errors.fieldsErrors[0].message}{" "}
          </p>
        )}
        {state.errors._form !== undefined && (
          <p className="my-4 text-red-600">*{state.errors._form[0]} </p>
        )}

        <SubmitButton>Add Property</SubmitButton>
      </div>
    </form>
  );
};

export default AddPropertyForm;
