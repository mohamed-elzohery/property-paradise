import React from "react";

interface InfoBoxProps {
  heading: string;
  children: React.ReactNode;
  bgColor: string;
  buttonInfo: {
    bgColor: string;
    text: string;
    link: string;
  };
}

const InfoBox: React.FC<InfoBoxProps> = ({
  bgColor,
  buttonInfo: { bgColor: btnBgColor, link, text: linkText },
  children,
  heading,
}) => {
  return (
    <div className={`${bgColor}  p-6 rounded-lg shadow-md`}>
      <h2 className="text-2xl font-bold">{heading}</h2>
      <p className="mt-2 mb-4">{children}</p>
      <a
        href={link}
        className={`${btnBgColor} inline-block  text-white rounded-lg px-4 py-2 hover:bg-gray-700`}
      >
        {linkText}
      </a>
    </div>
  );
};

export default InfoBox;
