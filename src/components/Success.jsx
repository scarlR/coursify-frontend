import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../context/userContext';

const Success = () => {
    const navigate = useNavigate();
    const { user } = UserData();

    return (
    <>
        {
        user &&    <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold text-green-500">Payment Successful!</h1>
            <p className="mt-4 text-lg">Thank you for your purchase. You can now access your course.</p>
            <button
                onClick={() => navigate(`/${user._id}/dashboard`)}
                className="mt-8 bg-blue-500 text-white px-4 py-2 rounded-md"
            >
                Go to Dashboard
            </button>
        </div>
            }
            </>
    );
};

export default Success;