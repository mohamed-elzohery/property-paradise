"use client";
import { bookmarkProperty } from "@/actions/bookmarkProperty";
import { HasProperty } from "@/types/properties/Property";
import { User } from "@/types/user/User";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";

interface BookmarkButtonsProps extends HasProperty {
  userDetails: null | User;
}

const BookmarkButton: React.FC<BookmarkButtonsProps> = ({
  property,
  userDetails,
}) => {
  const [formState, action] = useFormState(
    bookmarkProperty.bind(null, property._id),
    {
      callNumber: 0,
      isBookmarked:
        !!userDetails && userDetails.bookmarks.includes(property._id),
      message: "",
      success: false,
    }
  );

  useEffect(() => {
    if (formState.callNumber === 0) return;
    if (formState.success) toast.success(formState.message);
    else toast.error(formState.message);
  }, [formState.callNumber, formState.message, formState.success]);

  return (
    <form action={action}>
      <button
        className={`bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center ${
          formState.isBookmarked ? "bg-red-600" : ""
        }`}
      >
        <FaBookmark className="mr-2" />{" "}
        {formState.isBookmarked ? "Remove Bookmark" : "Bookmark Property"}
      </button>
    </form>
  );
};

export default BookmarkButton;
