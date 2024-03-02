import { auth } from "@/lib/utils/auth";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { fetchPropertiesByUserID } from "@/lib/data/properties";
import { notFound } from "next/navigation";
import ProfileCard from "@/ui/profile/ProfileCard";
import LisitngCard from "@/ui/properties/PropertyListings/LisitngCard";

const ProfilePage = async () => {
  const session = await auth();
  if (!session) return notFound();
  const userLisitings = await fetchPropertiesByUserID(
    session?.user?.id as string
  );

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <ProfileCard user={session.user} />
            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              {userLisitings?.length === 0 && (
                <p className="bold text-center my-6">
                  No lisitings are added yet
                </p>
              )}
              {userLisitings?.map((property) => (
                <LisitngCard property={property} key={property._id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
