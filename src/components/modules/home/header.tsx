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
      <h1 className="text-2xl md:text-3xl font-light text-gray-800">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-1 text-sm md:text-base text-gray-500">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default Header;
