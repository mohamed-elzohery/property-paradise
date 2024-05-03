"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`${pending ? "opacity-75" : "opacity-100"}`}
      aria-disabled={pending}
    >
      {pending ? "Loading" : "Save"}
    </button>
  );
}
