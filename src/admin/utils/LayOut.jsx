import React from "react";
import SideBar from "./SideBar";


const Layout = ({ children }) => {
  return (
    <div className="flex   w-full ">
      <SideBar />
      <div className="mx-auto my-12">{children}</div>
    </div>
  );
};

export default Layout;
