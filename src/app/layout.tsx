import React, { ReactNode } from "react";
import "@/styles/global.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Property Paradise | Find your dream property",
  description:
    "find a cheap rental property. we provide the cheepest rooms, house and studios.",
  keywords: ["rental properties", "cheap properties", "rent room"],
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
