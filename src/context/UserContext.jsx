import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../main";
import toast, { Toaster } from "react-hot-toast";


const UserContext = createContext();

 const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState([]);
    const [isAuth, setIsAuth] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [loading, setLoading] = useState(true);

    async function loginUser(email, password, navigate,fetchMyCourse) {
        setBtnLoading(true);
        try {
            const { data } = await axios.post(
              `${serverUrl}/api/user/loginUser`,
              {
                email,
                password,
              },
              {
                headers: {
                      "Content-Type": "application/json",
                   
                },
              }
            );
            toast.success(data.message);
            localStorage.setItem("token", data.token);
            setUser(data.user);
            setIsAuth(true);
            setBtnLoading(false);
            navigate("/");
            fetchMyCourse();
        } catch (error) {
            console.log(error);
            setIsAuth(false);
            setBtnLoading(false);
            toast.error(error.response.data.message);
        }
    }
    async function fetchUser() {
        setLoading(true);
        try {
            const { data } = await axios.get(
                `${serverUrl}/api/user/myProfile`,
                {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                }
            );
            setIsAuth(true);
            setUser(data.user);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setIsAuth(false);
            setLoading(false);
        }
    }

    async function registerUser(name, email, password, navigate) {
        setBtnLoading(true);
        try {
            const { data } = await axios.post(
                `${serverUrl}/api/user/register`,
                {
                    name,
                    email,
                    password,
                }
            );
            localStorage.setItem("activationToken", data.activationToken);
            navigate("/verify");
            setBtnLoading(false);
            toast.success(data.message);
        } catch (error) {
            console.log(error);
            setBtnLoading(false);
            toast.error(error.response.data.message);
        }
    }

    async function verifyUser(otp, navigate) {
        setBtnLoading(true);
        try {
            const { data } = await axios.post(
                `${serverUrl}/api/user/verifyUser`,
                {
                    otp,
                    activationToken: localStorage.getItem("activationToken"),
                }
            );
           
           
            setBtnLoading(false);
            localStorage.clear()
            
            navigate("/login")
            toast.success(data.message)
        } catch (error) {
            console.log(error);
           setBtnLoading(false);
            toast.error(error.response.data.message)
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);
    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                isAuth,
                setIsAuth,
                btnLoading,
                setBtnLoading,
                loginUser,
                loading,
                setLoading,
                fetchUser,
                registerUser,
                verifyUser
            }}
        >
            {children}
            <Toaster />
        </UserContext.Provider>
    );
};

export const UserData = () => useContext(UserContext);
export default UserContextProvider;
