import { IoMdLogOut } from "react-icons/io";
import { UserData } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

const Account = () => {
  const navigate = useNavigate();
  const { user, setUser, setIsAuth } = UserData();

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/login");
    setUser(null);
    setIsAuth(false);
    toast.success("Logout Successfully");
  };
  return (
    <div className="flex flex-col justify-center items-center h-[80vh]">
      {user && (
        <div className=" w-10/12 md:w-6/12 border-4 border-purple-300 flex flex-col justify-center items-center rounded-lg h-[50vh]">
          <h2>My Profile</h2>
          <div className="profile-info">
            <p>
              <strong>Name - {user.name} </strong>
            </p>

            <p>
              <strong>Email - {user.email} </strong>
            </p>

            <button
              onClick={() => navigate(`/${user._id}/dashboard`)}
              className="bg-red-300 p-2 mt-2 rounded-md"
            >
              Dashboard
            </button>

            <br />
           
            {user.role === "admin" && (
              <button
                onClick={() => navigate(`/admin/dashboard`)}
                className="bg-red-300 p-2 mt-2 rounded-md"
              >
                Admin Dashboard
              </button>
            )}
            <br />

            <button
              className="flex items-center p-2 mt-2 rounded-md text-white"
              style={{ background: "red" }}
              onClick={logoutHandler}
            >
              <IoMdLogOut />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
