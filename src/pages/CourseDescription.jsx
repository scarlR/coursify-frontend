import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CourseData } from '../context/CourseContext';
import { serverUrl } from '../main';
import axios from 'axios';
import { loadStripe } from "@stripe/stripe-js"; 

const CourseDescription = ({ user }) => {
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const navigate = useNavigate();
    const { fetchCourse,course,fetchMyCourse} = CourseData();
    console.log(course)
    
    const checkoutHandler = async () => {
      const token = localStorage.getItem("token");
      setLoading(true);
      const stripe = await loadStripe(
        "pk_test_51PqrrTIbtPjP9VqFS50R44MR3pKCV33FKoEcu0uChulx94VNNPEccAiuPq3myNNrETefs5ZhUAWEPfFVDL3aCK5N003EcqVBPG"
      );
      const response = await axios.post(
        `${serverUrl}/api/course/checkout/${params.id}`,
        {},
        {
          headers: {
            token,
          },
        }
      );
      console.log(response.data);

      const result = stripe.redirectToCheckout({
        sessionId: response.data.id,
      });

      if (result.error) {
        console.log(result.error);
      }
    };
    
    useEffect(() => {
        fetchCourse(params.id)
        fetchMyCourse();
    }, [])
    
    

  return (
      <div className='my-16'>{
         
          course && (
          <div>
              <div className='flex flex-col justify-center items-center gap-2'>
                  <img className=' w-60 h-60 md:w-96 md:h-96' src={course.image} alt="course_img" />
                  <div className='flex flex-col justify-center items-center gap-2 font-bold font-mono'>
                      <h2 className=' '>{course.title}</h2>
                      <h2><span className='text-blue-500'>Instructor</span> - {course.createdBy}</h2>
                      <h2><span className='text-blue-500'>Duration</span> - {course.duration} weeks</h2>
                          
                      <p><span className='text-blue-500'>Price</span> : Lets's get started with course @ Rs {course.price}</p>
                      <h2> <span className='text-blue-500'>Course Details</span> : {course.description}</h2>
                  </div>
                 
                  {
                      user && user.subscription.includes(course._id) ? 
                          <button
                        onClick={() => navigate(`/course/study/${course._id}`)}
                        className=" bg-orange-500 text-white p-2 rounded-md mt-2">
                    Study
                          </button> :
                          <button
                        onClick={checkoutHandler}
                        className=" bg-orange-500 text-white p-2 rounded-md mt-2">
                    Buy Now
                    </button>
                      }
              </div>
          </div>
      )}
        </div>
  )
}

export default CourseDescription