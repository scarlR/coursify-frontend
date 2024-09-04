import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/userContext";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { btnLoading, registerUser } = UserData();
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        await registerUser(name, email, password, navigate);
    }
    return (
        <div className="h-[90vh] w-full flex justify-center items-center">
            <form
                onSubmit={handleSubmit}
                className="flex-col justify-center items-center p-4 "
            >
                <h2 className="flex justify-center items-cente text-2xl text-blue-500">
                    Register
                </h2>
                <div className="">Name</div>

                <input
                    type="text"
                    placeholder="name"
                    className="border-2 rounded-md border-blue-100 w-full"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <br />
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
                <button disabled={btnLoading} type="submit" className="bg-green-300 text-black rounded-md px-2 my-2">
                    {btnLoading?"Please Wait...":"Register"}
                </button>
                <div>
                    Already have an account?{" "}
                    <Link to="/login">
                        <span className="underline text-red-300">Login</span>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
