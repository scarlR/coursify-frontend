
import {
    AiFillFacebook,
    AiFillTwitterSquare,
    AiFillInstagram,
} from "react-icons/ai";

const Footer = () => {
    return (
        <footer>
            
            <div className="flex flex-col justify-center items-center bg-purple-200  p-4 text-center">
                <p>
                    &copy; 2024 Your Coursify Platform. All rights reserved.{" "}
                   
                </p>
                <p>
                    {" "}
                    Made with ❤️ <a href="">Raunak Scarlet</a>
                </p>
                <div className="flex text-2xl text-black">
                    <a href="">
                        <AiFillFacebook />
                    </a>
                    <a href="">
                        <AiFillTwitterSquare />
                    </a>
                    <a href="">
                        <AiFillInstagram />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
