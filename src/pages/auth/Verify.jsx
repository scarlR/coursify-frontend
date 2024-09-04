import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/userContext";
const Verify = () => {

    const [otp, setOtp] = useState(null);
    const navigate = useNavigate();

    const { btnLoading, verifyUser } = UserData();

    const handleVerify = async (e) => {
        e.preventDefault();
        await verifyUser(Number(otp), navigate);
    }

    return (
        <div className="h-[90vh] w-full flex justify-center items-center">
            <form
                onSubmit={handleVerify}
                className="flex-col justify-center items-center p-4 "
            >
                <h2 className="flex justify-center items-cente text-2xl text-blue-500">
                    Verify
                </h2>

                <div className="">OTP</div>

                <input
                    type="number"
                    placeholder="otp"
                    className="border-2 rounded-md border-blue-100 w-full"
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    required
                />
                <br />

                
                <button disabled={btnLoading} className="bg-green-300 text-black rounded-md px-2 my-2">
                    {
                        btnLoading?"Please Wait...":"Verify"
                  }
                </button>
                <div>
                    Go to {" "}
                    <Link to="/login">
                        <span className="underline text-red-300">Login</span>
                    </Link> page
                </div>
            </form>
        </div>
    );

};

export default Verify;
