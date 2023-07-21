import React from "react";

interface CardProps {
  bgColor: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  border?: boolean;
}

const Card: React.FC<CardProps> = ({
  bgColor,
  icon,
  title,
  description,
  border,
}) => {
  return (
    <div
      className={`p-10 flex flex-col items-center text-center group ${
        border ? "md-lg-xl:border-r" : ""
      } md-lg-xl:border-b hover:bg-slate-50 cursor-pointer`}
    >
      <span
        className={`p-5 rounded-full ${bgColor} text-white shadow-lg shadow-${bgColor}-200`}
      >
        {icon}
      </span>
      <p className="text-xl font-medium text-slate-700 mt-3">{title}</p>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
    </div>
  );
};

export default Card;
