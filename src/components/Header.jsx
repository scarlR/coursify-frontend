import { NavLink ,Link} from "react-router-dom";
import { UserData } from "../context/UserContext";

const Header = () => {
    const { isAuth } = UserData();
    return (
      <div className="flex items-center justify-between p-3">
        <div className="text-xl md:text-3xl text-blue-500 font-bold">
          <Link to="/"> Coursify</Link>
        </div>

        <div className="flex gap-2 sm:gap-4 md:gap-6 text-md md:md:text-xl items-center justify-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-bold" : "text-gray-500 font-bold "
            }
          >
            Home{" "}
          </NavLink>

          <NavLink
            to="/courses"
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-bold" : "text-gray-500 font-bold"
            }
          >
            Courses{" "}
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-bold" : "text-gray-500 font-bold"
            }
          >
            About
          </NavLink>
          {isAuth ? (
            <NavLink
              to="/account"
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-bold" : "text-gray-500 font-bold"
              }
            >
              Account
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-bold" : "text-gray-500 font-bold"
              }
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    );
};

export default Header;
