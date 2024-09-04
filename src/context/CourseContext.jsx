import { createContext, useContext, useEffect, useState } from "react";
import { serverUrl } from "../main";
import axios from "axios";
import toast from "react-hot-toast";

const CourseContext = createContext();

export const CourseContextProvider = ({ children }) => {
    const [courses, setCourses] = useState([]);
    const [course, setCourse] = useState([]);
    const [myCourse, setMyCourse] = useState([]);
    
    async function fetchCourses() { 
        try {
            const { data } = await axios.get(
                `${serverUrl}/api/course/getAllCourses`
            );
            setCourses(data.courses)
           

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
        }
    }

    async function fetchCourse(id) {
        try {
            const { data } = await axios.get(`${serverUrl}/api/course/${id}`)
            setCourse(data.course)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
        }
    }

    async function fetchMyCourse() {
         const token = localStorage.getItem("token");
        try {
             const { data } = await axios.get(`${serverUrl}/api/course/myCourse`,{
            headers: {
                token
            }
                })
            
            setMyCourse(data.courses);

        } catch (error) {
             console.log(error)
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        fetchCourses();
        fetchMyCourse();
    }, []);
    return (
        <CourseContext.Provider
            value={{
                courses,
                fetchCourses,
                fetchCourse,
                course,
                myCourse,
                fetchMyCourse
            }}
        >
            {children}
        </CourseContext.Provider>
    );
};

export const CourseData =()=> useContext(CourseContext);