import { Link } from "react-router-dom";
import Testimonials from "../components/Testimonials";

const Home = () => {
    return (

        <div className=" w-full flex justify-center items-center h-fit mb-12">
            <div className="flex-col justify-center items-center">
                <h1 className="text-3xl text-bold  py-12 px-8 text-center">
                    Welcome to our{" "}
                    <span className="text-blue-500 font-bold underline">
                        Coursify Platform
                    </span>
                </h1>
                <p className="text-center ">Leran, Grow, Excel</p>
                <Link to="/courses">
                    <button className="bg-red-300 block mx-auto mt-4 p-2 rounded-md">
                        Get Started
                    </button>
                </Link>
                <Testimonials />
            </div>
        </div>
    );
};

export default Home;
