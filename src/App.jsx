import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Verify from './pages/auth/Verify';
import About from './pages/About';
import Footer from './components/Footer';
import Account from './pages/Account';
import Courses from './pages/Courses';
import { UserData } from './context/userContext';
import Loading from './components/Loading';
import CourseDescription from './pages/CourseDescription';
import Success from './components/Success';
import Cancel from './components/Cancel';
import VerifyPayment from './components/VerifyPayment';
import Dashboard from './pages/Dashboard';
import CourseStudy from './pages/CourseStudy';
import Lecture from './pages/Lecture';
import AdminDashboard from './admin/dashboard/AdminDashboard';
import AdminCourses from './admin/courses/AdminCourses';
function App() {
    
    const { isAuth, loading,user } = UserData();
    
    return (
      <>
        {loading ? (
          <Loading />
        ) : (
          <BrowserRouter>
            <Header isAuth={isAuth} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={isAuth ? <Home /> : <Login />} />
              <Route
                path="/register"
                element={isAuth ? <Home /> : <Register />}
              />
              <Route path="/verify" element={isAuth ? <Home /> : <Verify />} />
              <Route
                path="/account"
                element={isAuth ? <Account /> : <Login />}
              />
              <Route path="/about" element={<About />} />
              <Route path="/courses" element={<Courses />} />
              <Route
                path="/course/:id"
                element={isAuth ? <CourseDescription user={user} /> : <Login />}
              />
              <Route
                path="/verify/:sessionId"
                element={isAuth ? <VerifyPayment /> : <Login />}
              />
              <Route path="/cancel" element={isAuth ? <Cancel /> : <Login />} />
              <Route
                path="/success"
                element={isAuth ? <Success /> : <Login />}
              />
              <Route
                path="/:id/dashboard"
                element={isAuth ? <Dashboard user={user} /> : <Login />}
              />
              <Route
                path="/course/study/:id"
                element={isAuth ? <CourseStudy user={user} /> : <Login />}
              />
              <Route
                path="/lectures/:id"
                element={isAuth ? <Lecture user={user} /> : <Login />}
              />
              <Route
                path="/admin/dashboard"
                element={isAuth ? <AdminDashboard user={user} /> : <Login />}
              />
              <Route
                path="/admin/course"
                element={isAuth ? <AdminCourses user={user} /> : <Login />}
              />
            </Routes>
            <Footer />
          </BrowserRouter>
        )}
      </>
    );
}

export default App
