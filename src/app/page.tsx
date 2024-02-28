import InfoBoxes from "@/ui/Info/info-boxes/InfoBoxes";
import Hero from "@/ui/hero/Hero";
import HomeProperties from "@/ui/properties/HomeProperties";
import React from "react";

const HomePage = () => {
  console.log(process.env.MONGODB_URI);
  return (
    <>
      <Hero />
      <InfoBoxes />
      <HomeProperties />
    </>
  );
};

export default HomePage;
