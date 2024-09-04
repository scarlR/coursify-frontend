import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { serverUrl } from '../main';
import { CourseData } from '../context/CourseContext';
import { UserData } from '../context/UserContext';
import toast from "react-hot-toast";

const VerifyPayment = () => {
    const navigate = useNavigate();
   
    const token = localStorage.getItem("token");
    const { sessionId } = useParams();
    
    const { fetchUser } = UserData();
    const { fetchCourses,fetchMyCourse } = CourseData();
    const [verified, setVerified] = useState(false);

     const verifyPayment = async () => {
            
            try {
                const response = await axios.post(`${serverUrl}/api/course/verifyPayment`, { session_id: sessionId }, {
                    headers: {
                        token,
                    }
                });
                await fetchUser();
                await fetchCourses();
                await fetchMyCourse();
                toast.success(response.data.message);
            } catch (error) {
                console.error("Payment verification error:", error);
                toast.error(error.response?.data?.message || "Payment verification failed");
            }
        };
   
    useEffect(() => {
        if (!verified) { 
            verifyPayment();
            navigate('/success')
        }
    }, [verified,sessionId]);

    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold text-green-500">Verifying!</h1>
           
        </div>
        </>
    );
};

export default VerifyPayment;