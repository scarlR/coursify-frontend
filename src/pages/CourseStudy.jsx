import React, { useEffect } from 'react'
import { CourseData } from '../context/CourseContext'
import { useNavigate, useParams,Link } from 'react-router-dom';
import { serverUrl } from '../main';

const CourseStudy = ({user}) => {
    const { fetchCourse, course } = CourseData();
    const params = useParams();
    const navigate = useNavigate();
 
    if (user && user.role !== "admin" && !user.subscription.includes(params.id)) {
        return navigate("/");

    }


    useEffect(() => {
        fetchCourse(params.id);
    },[])
  return (
      <div className='mt-16'>
          <div className='flex flex-col justify-center items-center gap-2 mb-12'>
                  <img className=' w-60 h-60 md:w-96 md:h-96' src={course.image} alt="course_img" />
                  <div className='flex flex-col justify-center items-center gap-2 font-bold font-mono'>
                      <h2 className=' '>{course.title}</h2>
                      <h2><span className='text-blue-500'>By</span> - {course.createdBy}</h2>
                      <h2><span className='text-blue-500'>Duration</span> - {course.duration} weeks</h2>
                          
                      <p><span className='text-blue-500'>Price</span> : Lets's get started with course @ Rs {course.price}</p>
                  <h2> <span className='text-blue-500'>Course Details</span> : {course.description}</h2>
                  
                 <button
                            onClick={()=>navigate(`/lectures/${course._id}`)}
                            className=" bg-red-300 p-2 rounded-md mt-2">
                    Lectures
                        </button>
                  </div>
          </div>
      </div>
  )
}

export default CourseStudy