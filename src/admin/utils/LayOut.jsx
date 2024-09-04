import React from "react";
import Sidebar from "./Sidebar";


const Layout = ({ children }) => {
  return (
    <div className="flex   w-full ">
      <Sidebar />
      <div className="mx-auto my-12">{children}</div>
    </div>
  );
};

export default Layout;
