"use client";
import { createMessage } from "@/actions/createMessage";
import { HasProperty } from "@/types/properties/Property";
import React from "react";
import { useFormState } from "react-dom";
import { FaPaperPlane } from "react-icons/fa";

interface PropertyContactFormProps extends HasProperty {}

const PropertyContactForm: React.FC<PropertyContactFormProps> = () => {
  const [formState, action] = useFormState(createMessage, {
    errors: { fieldsErrors: {} },
    success: false,
  });
  console.log(formState);
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
      <form action={action}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            name="name"
            placeholder="Enter your name"
            required={true}
          />
          <p className="my-2 text-red-600">
            {formState.errors.fieldsErrors.name &&
              formState.errors.fieldsErrors.name.map((err) => (
                <p className="my-2 text-red-600" key={err}>
                  {err}
                </p>
              ))}
          </p>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            required={true}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone"
          >
            Phone:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            type="text"
            name="phone"
            placeholder="Enter your phone number"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="message"
          >
            Message:
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
            id="message"
            placeholder="Enter your message"
            defaultValue={""}
            name="body"
          />
          {formState.errors.fieldsErrors.body &&
            formState.errors.fieldsErrors.body.map((err) => (
              <p className="my-2 text-red-600" key={err}>
                {err}
              </p>
            ))}
        </div>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
            type="submit"
          >
            <FaPaperPlane className="mr-2" /> Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyContactForm;
