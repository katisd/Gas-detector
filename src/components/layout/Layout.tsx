import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <div className="flex h-20 w-full items-center justify-center bg-primary text-4xl font-extrabold text-current">
        Gas Detector
      </div>
      <div>Dashboard</div>
      <div className="flex flex-row">{children}</div>
    </div>
  );
};

export default Layout;
