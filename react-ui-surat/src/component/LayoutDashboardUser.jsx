import React from "react";

const LayoutDashboardUser = ({ children }) => {
  return (
    <div
      id="main-content"
      className="h-full max-w-full bg-gray-50 relative overflow-y-auto"
    >
      <main>
        <div className="container mx-auto flex justify-between items-center">
          <div className="w-full my-10">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default LayoutDashboardUser;
