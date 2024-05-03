"use client";

import { useFormStatus } from "react-dom";

export const SubmitButton: React.FC<{ children: React.ReactNode }> = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`${
        pending ? "opacity-75" : "opacity-100"
      } flex gap-4 justify-center items-center my-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline`}
      aria-disabled={pending}
    >
      <span>{pending ? "Loading" : "Save"}</span>
      {pending && (
        <div
          className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      )}
    </button>
  );
};
