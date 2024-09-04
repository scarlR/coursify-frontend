import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cancel = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold text-red-500">Payment Canceled</h1>
            <p className="mt-4 text-lg">It looks like you canceled the payment. Would you like to try again?</p>
            <button
                onClick={() => navigate('/courses')}
                className="mt-8 bg-blue-500 text-white px-4 py-2 rounded-md"
            >
                Browse Courses
            </button>
            <button
                onClick={() => navigate(-1)} 
                className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-md"
            >
                Go Back
            </button>
        </div>
    );
};

export default Cancel;