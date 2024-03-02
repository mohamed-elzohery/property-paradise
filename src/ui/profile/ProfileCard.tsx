import { User } from "next-auth";
import Image from "next/image";
import ProfileDefault from "@/assets/images/profile.png";

import React from "react";

interface ProfileCardProps {
  user?: User;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  return (
    <div className="md:w-1/4 mx-20 mt-10">
      <div className="relative mb-4 h-32 w-32 md:h-48 md:w-48 ">
        <Image
          className=" rounded-full mx-auto md:mx-0"
          src={user?.image || ProfileDefault}
          alt="user profile"
          fill
        />
      </div>
      <h2 className="text-2xl mb-4">
        <span className="font-bold block">Name: </span> {user?.name}
      </h2>
      <h2 className="text-2xl">
        <span className="font-bold block">Email: </span> {user?.email}
      </h2>
    </div>
  );
};

export default ProfileCard;
