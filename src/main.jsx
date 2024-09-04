import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CourseContextProvider } from './context/CourseContext'
import  UserContextProvider  from './context/UserContext.jsx'


export const serverUrl = "https://coursify-backend-jn8l.onrender.com";

createRoot(document.getElementById("root")).render(
    
        <UserContextProvider>
            <CourseContextProvider>
                <App />
            </CourseContextProvider>
        </UserContextProvider>
   
);
