import { useEffect } from "react";
import { CourseData } from "../context/CourseContext";

import CourseCard from "./CourseCard";

const Courses = () => {
    const { courses } = CourseData();

 
    return (
        <div className=" h-fit mb-12 ">
            <h1 className="font-bold text-3xl text-blue-500 text-center my-16 ">
                Available Courses
            </h1>
            {courses && courses?.length > 0 ? (
                <div className=" flex flex-wrap gap-4 items-center justify-center">
                    
                    {courses.map((course) => (
                        <CourseCard key={course._id} course={course} />
                    ))}
                </div>
            ) : (
                <div>No Courses Yet!</div>
            )}
        </div>
    );
};

export default Courses;
