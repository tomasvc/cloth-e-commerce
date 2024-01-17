import React from "react";

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="bg-gray-50 flex justify-center">
      <div className="w-full lg:w-3/4">{children}</div>
    </div>
  );
};
