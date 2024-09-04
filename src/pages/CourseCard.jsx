import {  useNavigate } from "react-router-dom";
import { UserData } from "../context/userContext";
import { serverUrl } from "../main";
import { CourseData } from "../context/CourseContext";
import toast from "react-hot-toast";
import axios from "axios";

const CourseCard = ({ course }) => {
   
    const { user, isAuth } = UserData();
    const { fetchCourses } = CourseData();
    const navigate = useNavigate();

      const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this course")) {
      try {
        const { data } = await axios.delete(`${serverUrl}/api/admin/delete-course/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        toast.success(data.message);
        fetchCourses();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };


    return (
        <div
            className="flex flex-col items-center justify-center border-4 font-mono border-purple-300 rounded-2xl p-8 "
            key={course?._id}
        >
            <img
                className=" h-48 w-48"
                src={course?.image}
                alt="courses_img"
            />
            <h3 className="font-bold mt-2 uppercase">{course?.title}</h3>
            <p>
                {" "}
                Instructor- <span className="font-bold">{course?.createdBy}</span>
            </p>
            <p>
                Duration - <span className="font-bold">{course?.duration}</span>{" "}
                hours
            </p>
            <p className="font-bold font-mono">INR {course?.price}</p>
            

            {
                isAuth ? (
                    <>
                        {
                            user && user?.role !== "admin" ?
                            <>
                            {
                                    user?.subscription.includes(course?._id) ?
                                        <button
                        onClick={() => navigate(`/course/study/${course?._id}`)}
                        className=" bg-red-300 p-2 rounded-md mt-2">
                    Study
                    </button> : <button
                        onClick={() => navigate(`/course/${course?._id}`)}
                        className=" bg-red-300 p-2 rounded-md mt-2">
                    Get Started
                    </button>
                            }
                        </> :
                            <button
                        onClick={() => navigate(`/course/study/${course._id}`)}
                        className=" bg-red-300 p-2 rounded-md mt-2">
                    Study
                    </button>}
                              
                        
                    </>
                ) : (
                        <button
                            onClick={()=>navigate('/login')}
                            className=" bg-red-300 p-2 rounded-md mt-2">
                    Get Started
                        </button>
                    )
                    
            }
            {
                user && user.role === "admin" && (
                    <button
                        onClick={() => deleteHandler(course?._id)}
                        className=" bg-orange-500 text-white p-2 rounded-md mt-2">
                    Delete
                    </button>
                )
            }
        </div>
    );
};

export default CourseCard
