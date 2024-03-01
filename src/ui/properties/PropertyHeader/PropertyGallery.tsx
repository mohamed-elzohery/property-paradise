import Image, { StaticImageData } from "next/image";
import React from "react";

interface PropertyGalleryProps {
  images: string[];
}

const PropertyGallery: React.FC<PropertyGalleryProps> = ({ images }) => {
  return (
    <section className="w-100 mb-6 mx-auto grid fluid-grid bg-blue-50 gap-6 p-6 ]">
      {images.map((imageSrc, index) => (
        <div className="relative rounded-lg h-[400px]" key={imageSrc}>
          <Image
            className="rounded-lg"
            src={imageSrc}
            alt={`property image ${index + 1}`}
            fill
          />
        </div>
      ))}
    </section>
  );
};

export default PropertyGallery;
