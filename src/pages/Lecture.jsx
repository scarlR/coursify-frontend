import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../main";
import Loading from "../components/Loading";
import toast from "react-hot-toast";
import { TiTick } from "react-icons/ti";
const Lecture = ({ user }) => {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(false);
  const [show, setShow] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  if (user && user.role !== "admin" && !user.subscription.includes(params.id))
    return navigate("/");

  async function fetchLectures() {
    try {
      const { data } = await axios.get(
        `${serverUrl}/api/course/lectures/${params.id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setLectures(data.lectures);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function fetchLecture(id) {
    setLecLoading(true);
    try {
      const { data } = await axios.get(
        `${serverUrl}/api/course/single-lecture/${id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setLecture(data.lecture);
      setLecLoading(false);
    } catch (error) {
      console.log(error);
      setLecLoading(false);
    }
  }

  const submitHandler = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("file", video);

    try {
      const { data } = await axios.post(
        `${serverUrl}/api/admin/addLecture/${params.id}`,
        myForm,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      toast.success(data.message);
      setBtnLoading(false);
      setShow(false);
      fetchLectures();
      setTitle("");
      setDescription("");
      setVideo("");
      setVideoPrev("");
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };

   const changeVideoHandler = (e) => {
     const file = e.target.files[0];
     const reader = new FileReader();

     reader.readAsDataURL(file);

     reader.onloadend = () => {
       setVideoPrev(reader.result);
       setVideo(file);
     };
   };
  
  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this lecture")) {
      try {
        const { data } = await axios.delete(`${serverUrl}/api/admin/delete-lecture/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        toast.success(data.message);
        fetchLectures();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    fetchLectures();
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex  justify-center items-center gap-4 my-16 mx-8 font-mono font-bold">
            <div className="flex flex-col justify-center items-center gap-4">
              {lecLoading ? (
                <Loading />
              ) : (
                <>
                  {lecture.video ? (
                    <>
                      <video
                        src={lecture.video}
                        width={"70%"}
                        controls
                        controlsList="nodownload noremoteplayback"
                        disablePictureInPicture
                        disableRemotePlayback
                        autoPlay
                      ></video>
                      <h1>{lecture.title}</h1>
                      <h1>{lecture.description}</h1>
                    </>
                  ) : (
                    <h1 className="text-4xl font-bold text-blue-500 py-12 px-8 text-center">
                      Please select a Lecture
                    </h1>
                  )}
                </>
              )}
            </div>
            <div className="flex flex-col justify-center items-start gap-4 m-16">
              {user && user.role === "admin" && (
                <button
                  className=" bg-green-300 p-2 rounded-md mt-2"
                  onClick={() => setShow(!show)}
                >
                  <div className="flex justify-center items-start">{show ? "Close" : "Add Lecture +"}</div>
                </button>
              )}
              {show && (
                <div className="flex flex-col justify-center items-center gap-4 ">
                  <h2 className=" text-blue-500 text-2xl p-2 rounded-md mt-2">
                    Add Lecture
                  </h2>
                  <form
                    onSubmit={submitHandler}
                    className="flex flex-col gap-2 justify-center items-center border-4 rounded-md p-8"
                    action=""
                  >
                    <label htmlFor="text">Title</label>
                    <input
                      className="border-4"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />

                    <label htmlFor="text">Description</label>
                    <textarea
                      className="border-4 h-24"
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />

                    <input
                      className="border-4"
                      type="file"
                      onChange={changeVideoHandler}
                      placeholder="choose video"
                      required
                    />
                    {videoPrev && (
                      <video
                        src={videoPrev}
                        alt=""
                        width={300}
                        controls
                      ></video>
                    )}

                    <button
                      disabled={btnLoading}
                      type="submit"
                      className=" bg-red-500 p-2 text-white rounded-md mt-2"
                    >
                      {btnLoading ? "Please Wait..." : "Add"}
                    </button>
                  </form>
                </div>
              )}
              {lectures && lectures.length > 0 ? (
                lectures.map((e, i) => (
                  <div
                    className="flex flex-col justify-center items-start gap-4"
                    key={e._id}
                  >
                    <div
                      className={`${
                        lecture._id === e._id
                          ? "bg-black text-white "
                          : "bg-red-300 "
                      } cursor-pointer p-2 rounded-md mt-2 w-96`}
                      onClick={() => fetchLecture(e._id)}
                    >
                      {i + 1}. {e.title}
                    </div>
                    {user && user.role === "admin" && (
                      <button
                        className=" bg-red-700 p-2 text-white rounded-md mt-2"
                        onClick={() => deleteHandler(e._id)}
                      >
                        Delete {e.title}
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p> No Lectures Yet!</p>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Lecture;
