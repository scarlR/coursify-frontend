import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserData } from "../context/UserContext";
import axios from "axios";
import { CourseData } from "../context/CourseContext";
import toast from "react-hot-toast";
import { serverUrl } from "../main";

const Success = () => {
  const navigate = useNavigate();
  const { user, fetchUser } = UserData();
    const { fetchCourses, fetchMyCourse } = CourseData();
    const { sessionId } = useParams();
    const token = localStorage.getItem("token");
    console.log(sessionId)

  const verifyPayment = async () => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/course/verifyPayment`,
        { session_id: sessionId },
        {
          headers: {
            token,
          },
        }
      );
      await fetchUser();
      await fetchCourses();
      await fetchMyCourse();
      toast.success(response.data.message);
    } catch (error) {
      console.error("Payment verification error:", error);
      toast.error(
        error.response?.data?.message || "Payment verification failed"
      );
    }
  };

  useEffect(() => {
    verifyPayment();
    navigate("/");
  }, []);

  return (
    <>
      {user && (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-bold text-green-500">
            Payment Successful!
          </h1>
          <p className="mt-4 text-lg">
            Thank you for your purchase. You can now access your course.
          </p>
          <button
            onClick={() => navigate(`/${user._id}/dashboard`)}
            className="mt-8 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Go to Dashboard
          </button>
        </div>
      )}
    </>
  );
};

export default Success;
