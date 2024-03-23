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
    <section className="w-100 mb-6 bg-blue-50 ">
      <div className="container  mx-auto fluid-grid gap-6 p-6 ">
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
                    className="rounded-lg cursor-pointer"
                    src={imageSrc}
                    alt={`property image ${index + 1}`}
                    fill
                  />
                )}
              </Item>
            </div>
          ))}
        </Gallery>
      </div>
    </section>
  );
};

export default PropertyGallery;
