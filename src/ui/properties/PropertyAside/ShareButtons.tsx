import { HasProperty } from "@/types/properties/Property";
import React from "react";
import { FaBookmark } from "react-icons/fa";

interface ShareButtonsProps extends HasProperty {}

const ShareButtons: React.FC<ShareButtonsProps> = () => {
  return (
    <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
      <FaBookmark className="mr-2" /> Share Property
    </button>
  );
};

export default ShareButtons;
