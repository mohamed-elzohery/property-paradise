"use client";
import Image, { StaticImageData } from "next/image";
import React from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";

interface PropertyGalleryProps {
  images: string[];
}

const PropertyGallery: React.FC<PropertyGalleryProps> = ({ images }) => {
  return (
    <section className="w-100 mb-6 mx-auto  fluid-grid bg-blue-50 gap-6 p-6 ]">
      <Gallery>
        {images.map((imageSrc, index) => (
          <div className="relative rounded-lg h-[400px]" key={imageSrc}>
            <Item
              original={imageSrc}
              thumbnail={imageSrc}
              width={"1000"}
              height={"600"}
            >
              {({ ref, open }) => (
                <Image
                  ref={ref}
                  onClick={open}
                  className="rounded-lg"
                  src={imageSrc}
                  alt={`property image ${index + 1}`}
                  fill
                />
              )}
            </Item>
          </div>
        ))}
      </Gallery>
    </section>
  );
};

export default PropertyGallery;
