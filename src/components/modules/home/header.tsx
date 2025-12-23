import React from "react";

type HeaderProps = {
  title: string;
  subtitle?: string;
  center?: boolean;
};

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  center = false,
}) => {
  return (
    <div className={`mb-6 ${center ? "text-center" : "text-left"}`}>
      <div className={`flex items-center ${center ? "justify-center" : ""} `}>
        <h1 className="text-2xl md:text-3xl font-light text-gray-800">
          {title}
        </h1>
        <div className="flex-1 h-px bg-gray-300 mt-6"></div>
      </div>

      {subtitle && (
        <p className="mt-1 text-sm md:text-base text-gray-500">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default Header;
