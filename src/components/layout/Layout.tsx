import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="space-y-10 overflow-visible bg-base-100">
      <div className="flex h-24 w-full items-center justify-center bg-primary text-4xl font-bold text-primary-content">
        Gas Detector
      </div>
      <div className="container mx-auto">
        <h1 className=" text-left text-3xl font-semibold">Dashboard</h1>
        <div className="my-2 flex flex-col space-y-5 md:flex-row md:space-x-5 md:space-y-0">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
