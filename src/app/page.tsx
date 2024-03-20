import InfoBoxes from "@/ui/Info/info-boxes/InfoBoxes";
import Hero from "@/ui/hero/Hero";
import HomeProperties from "@/ui/properties/HomeProperties";
import FeathuredProperties from "@/ui/properties/featured/FeathuredProperties";
import React from "react";

const HomePage = () => {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <FeathuredProperties />
      <HomeProperties />
    </>
  );
};

export default HomePage;
