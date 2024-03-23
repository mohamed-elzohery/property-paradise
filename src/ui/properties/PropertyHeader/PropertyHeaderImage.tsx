import Image, { StaticImageData } from "next/image";
import React from "react";

export interface PropertyHeaderImageProps {
  imageSrc: string | StaticImageData;
  description?: string;
}

const PropertyHeaderImage: React.FC<PropertyHeaderImageProps> = ({
  imageSrc,
  description,
}) => {
  return (
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1 h-[60vh] w-full relative">
          <Image
            src={imageSrc}
            alt={description || ""}
            className="object-cover"
            fill
            priority={true}
          />
        </div>
      </div>
    </section>
  );
};

export default PropertyHeaderImage;
