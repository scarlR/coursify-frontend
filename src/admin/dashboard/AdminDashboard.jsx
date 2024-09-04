import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from '../utils/LayOut';
import axios from 'axios';
import { serverUrl } from '../../main';

const AdminDashboard = ({user}) => {
    const navigate = useNavigate();

    if (user && user.role !== "admin") return navigate("/");

    const [stats, setStats] = useState([]);

  async function fetchStats() {
    try {
      const { data } = await axios.get(`${serverUrl}/api/admin/stats`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setStats(data.stats);
    } catch (error) {
      console.log(error);
    }
  }
useEffect(() => {
  fetchStats();
}, []);
  return (
    <div>
      <Layout>
        <h1 className="text-xl md:text-3xl text-blue-500 font-bold">
          Admin Dashboard
        </h1>
        <div className="flex justify-center items-center gap-4 my-6">
          <div className="flex flex-col items-center font-bold font-mono justify-center bg-red-300 rounded-md p-4">
            <p>Total Courses</p>
            <p>{stats.totalCourses}</p>
          </div>
          <div className="flex flex-col items-center font-bold font-mono justify-center bg-red-300 rounded-md p-4">
            <p>Total Lectures</p>
            <p>{stats.totalLectures}</p>
          </div>
          <div className="flex flex-col items-center font-bold font-mono justify-center bg-red-300 rounded-md p-4">
            <p>Total Users</p>
            <p>{stats.totalUsers}</p>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default AdminDashboard