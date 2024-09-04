import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";
import { CourseData } from "../../context/CourseContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { btnLoading, loginUser } = UserData();
    const { fetchMyCourse } = CourseData();



    const submitHandler = async (e) => {
       e.preventDefault();
       await loginUser(email,password,navigate,fetchMyCourse)
    };

    return (
        <div className="h-[90vh] w-full flex justify-center items-center">
            <form onSubmit={submitHandler}
                action=""
                className="flex-col justify-center items-center p-4 "
            >
                <h2 className="flex justify-center items-cente text-2xl text-blue-500">
                    Login
                </h2>

                <div className="">Email</div>

                <input
                    type="text"
                    placeholder="email"
                    className="border-2 rounded-md border-blue-100 w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br />

                <div>Password</div>
                <input
                    type="password"
                    placeholder="password"
                    className="border-2 rounded-md border-blue-100 w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    disabled={btnLoading}
                    type="submit" className="bg-green-300 text-black rounded-md px-2 my-2">
                   {btnLoading?"Please Wait...":"Login"}
                </button>
                <div>
                    Don&#39;t have an account?{" "}
                    <Link to="/register">
                        <span className="underline text-red-300">Register</span>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
