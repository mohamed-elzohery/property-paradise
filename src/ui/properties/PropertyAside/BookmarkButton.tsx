import { HasProperty } from "@/types/properties/Property";
import React from "react";
import { FaBookmark } from "react-icons/fa";

interface BookmarkButtonsProps extends HasProperty {}

const BookmarkButton: React.FC<BookmarkButtonsProps> = () => {
  return (
    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>
  );
};

export default BookmarkButton;
