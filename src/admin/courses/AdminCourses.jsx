import React, { useState } from "react";
import Layout from "../utils/LayOut";
import { useNavigate } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../pages/CourseCard";
import { serverUrl } from "../../main";
import toast from "react-hot-toast";
import axios from "axios";

const AdminCourses = ({ user }) => {
  const navigate = useNavigate();

  const categories = [
    "Web Development",
    "App Development",
    "Game Development",
    "Data Science",
    "Artificial Intelligence",
  ];

  if (user && user.role !== "admin") return navigate("/");
  const { courses, fetchCourses } = CourseData();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    

    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("category", category);
    myForm.append("price", price);
    myForm.append("createdBy", createdBy);
    myForm.append("duration", duration);
    myForm.append("file", image);

    

    try {
      const { data } = await axios.post(
        `${serverUrl}/api/admin/newCourse`,
        myForm,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log("Data received:", data);

      toast.success(data.message);
      setBtnLoading(false);
      await fetchCourses();
      setImage("");
      setTitle("");
      setDescription("");
      setDuration("");
      setImagePrev("");
      setCreatedBy("");
      setPrice("");
      setCategory("");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Course creation failed");
      setBtnLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center w-full h-full gap-8">
        <div className="flex flex-col gap-4 justify-center items-center">
          <h1 className="text-xl md:text-3xl text-blue-500 font-bold text-center">
            All Courses
          </h1>
          <div className="flex flex-wrap gap-2 items-center justify-center">
            {courses && courses.length > 0 ? (
              courses.map((e) => {
                return <CourseCard key={e?._id} course={e} />;
              })
            ) : (
              <p>No Courses Yet!</p>
            )}
          </div>
        </div>
        <div className="w-full flex justify-center">
          <div className="w-full max-w-md">
            <h1 className="font-bold text-3xl text-blue-500 text-center my-8">
              Add Courses
            </h1>
            <form
              className="flex flex-col w-full gap-4 justify-center items-center border-4 rounded-md p-8 font-mono font-bold text-lg"
              onSubmit={submitHandler}
            >
              <label htmlFor="title" className="w-full text-left">
                Title
              </label>
              <input
                className="border-4 w-full"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <label htmlFor="description" className="w-full text-left">
                Description
              </label>
              <input
                className="border-4 w-full"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />

              <label htmlFor="price" className="w-full text-left">
                Price
              </label>
              <input
                className="border-4 w-full"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />

              <label htmlFor="createdBy" className="w-full text-left">
                Created By
              </label>
              <input
                className="border-4 w-full"
                type="text"
                value={createdBy}
                onChange={(e) => setCreatedBy(e.target.value)}
                required
              />

              <label htmlFor="category" className="w-full text-left">
                Category
              </label>
              <select
                className="border-4 w-full"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value={""}>Select Category</option>
                {categories.map((e) => (
                  <option value={e} key={e}>
                    {e}
                  </option>
                ))}
              </select>

              <label htmlFor="duration" className="w-full text-left">
                Duration
              </label>
              <input
                className="border-4 w-full"
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              />

              <label htmlFor="file" className="w-full text-left">
                Upload Image
              </label>
              <input
                className="border-4 w-full"
                type="file"
                required
                onChange={changeImageHandler}
              />
              {imagePrev && (
                <img
                  src={imagePrev}
                  alt="Preview"
                  className="mt-4"
                  width={300}
                />
              )}

              <button
                type="submit"
                disabled={btnLoading}
                className="bg-red-300 p-2 mt-2 rounded-md"
              >
                {btnLoading ? "Please Wait..." : "Add"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminCourses;
