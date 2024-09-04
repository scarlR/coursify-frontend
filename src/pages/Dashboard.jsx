import React from 'react'
import { CourseData } from '../context/CourseContext';
import CourseCard from './CourseCard';

const Dashboard = ({user}) => {
    const { myCourse } = CourseData();
    console.log(myCourse)
  return (
    <div className=" h-fit ">
            <h1 className="font-bold text-3xl text-blue-500 text-center my-16 ">
                Purchased Courses
            </h1>
            {myCourse && myCourse?.length > 0 ? (
                <div className=" flex flex-wrap gap-4 items-center justify-center">
                    
                    {myCourse.map((course) => (
                        <CourseCard key={course._id} course={course} />
                    ))}
                </div>
            ) : (
                <div>No Courses Enrolled!</div>
            )}
        </div>
  )
}

export default Dashboard