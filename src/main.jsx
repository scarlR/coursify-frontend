import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserContextProvider } from './context/userContext.jsx'
import { CourseContextProvider } from './context/CourseContext.jsx'

export const serverUrl = "http://localhost:3001";
createRoot(document.getElementById("root")).render(
    
        <UserContextProvider>
            <CourseContextProvider>
                <App />
            </CourseContextProvider>
        </UserContextProvider>
   
);
