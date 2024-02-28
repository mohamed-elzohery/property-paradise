import React from "react";
import PropertyHeaderImage from "./PropertyHeaderImage";
import { PropertyHeaderImageProps } from "./PropertyHeaderImage";
import PropertyBackBtn from "./PropertyBackBtn";
export interface PropertyHeaderProps extends PropertyHeaderImageProps {}

const PropertyHeader: React.FC<PropertyHeaderProps> = ({
  imageSrc,
  description,
}) => {
  return (
    <>
      <PropertyHeaderImage imageSrc={imageSrc} description={description} />
      <PropertyBackBtn />
    </>
  );
};

export default PropertyHeader;
