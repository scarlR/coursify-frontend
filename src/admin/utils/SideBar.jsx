import React from "react";

import { Link } from "react-router-dom";
import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
import { FaBook, FaUserAlt } from "react-icons/fa";
import { UserData } from "../../context/UserContext";


const SideBar = () => {
  const { user } = UserData();
  return (
    <div className="bg-blue-200 w-16  sm:w-44 ">
      <ul className="flex flex-col gap-4 p-4 text-xl">
        <li>
          <Link className="flex gap-2 items-center " to={"/admin/dashboard"}>
            <div className="">
              <AiFillHome />
            </div>
            <span className="hidden sm:block ">Home</span>
          </Link>
        </li>

        <li>
          <Link className="flex gap-2 items-center " to={"/admin/course"}>
            <div className="">
              <FaBook />
            </div>
            <span className="hidden sm:block ">Courses</span>
          </Link>
        </li>

        <li>
          <Link className="flex gap-2 items-center " to={"/account"}>
            <div className="">
              <AiOutlineLogout />
            </div>
            <span className="hidden sm:block ">Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
