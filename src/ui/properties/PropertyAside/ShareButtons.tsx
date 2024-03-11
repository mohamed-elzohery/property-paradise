"use client";
import { HasProperty } from "@/types/properties/Property";
import React from "react";
import { FaShare } from "react-icons/fa";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

interface ShareButtonsProps extends HasProperty {}

const ShareButtons: React.FC<ShareButtonsProps> = ({ property }) => {
  const propertyTypeHashtag = `${property.type.replace(/\s/g, "")}ForRent`;
  const shareURL = `${process.env.NEXT_PUBLIC_DOMAIN}/propeties/${property._id}`;

  return (
    <div className="my-5 space-y-3">
      <h3 className="font-bold text-2xl text-center">Share This Property</h3>
      <div className="flex gap-3 justify-center items-center pb-4">
        <FacebookShareButton
          hashtag={propertyTypeHashtag}
          url={shareURL}
          title={property.name}
        >
          <FacebookIcon round={true} size={40} />
        </FacebookShareButton>
        <TwitterShareButton
          hashtags={[propertyTypeHashtag]}
          url={shareURL}
          title={property.name}
        >
          <TwitterIcon round={true} size={40} />
        </TwitterShareButton>
        <WhatsappShareButton
          separator={":: "}
          url={shareURL}
          title={property.name}
        >
          <WhatsappIcon round={true} size={40} />
        </WhatsappShareButton>
        <EmailShareButton
          subject={property.name}
          url={shareURL}
          body={`checkout this property: ${shareURL}`}
        >
          <EmailIcon round={true} size={40} />
        </EmailShareButton>
      </div>
    </div>
  );
};

export default ShareButtons;
