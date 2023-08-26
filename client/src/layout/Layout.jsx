import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCourses } from "../Redux/courseSlice";
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";

// import pages
import Navbar from "../components/Navbar/Navbar";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Courses from "../pages/Course/Courses";
import CoursesDetails from "../pages/Course/CourseDetails";
import MyCourses from "../pages/Course/MyCourses";
import ForgotPassword from "../pages/Password/ForgotPassword";
import ResetPassword from "../pages/Password/ResetPassword";
import Profile from "../pages/User/Profile";
import ChangePassword from "../pages/Password/ChangePassword";
import PageNotFound from "../pages/PageNotFound";
import Contact from "../pages/Contact/Contact";
import About from "../pages/About/About";
import Footer from "../components/footer/Footer";
import RequireAuth from "../components/auth/RequireAuth";
import NotRequireAuth from "../components/auth/NotRequireAuth";
import Faqs from "../components/faqs/Faqs";
import CourseCreate from "../pages/Course/CourseCreate";
import DisplayLecture from "../pages/Dashboard/DisplayLecture";
import Checkout from "../pages/Payment/Checkout";
import CheckoutSuccess from "../pages/Payment/CheckoutSuccess";
import CheckoutFail from "../pages/Payment/CheckoutFail";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import AddLecture from "../pages/Dashboard/AddLecture";
import UpdateLecture from "../pages/Dashboard/updateLecture";
 
export default function Layout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // Fetching data from Redux store
  const coursesFetched = useSelector((state) => state.course.coursesFetched);

  // Fetching courses data if not fetched yet
  useEffect(() => {
    if (!coursesFetched) {
      dispatch(getAllCourses());
    }
  }, [coursesFetched, dispatch]);

  const shouldShowNavbar =
    !location.pathname.includes("/login") &&
    !location.pathname.includes("display-lecture") &&
    !location.pathname.includes("/signup") &&
    !location.pathname.includes("password");

  const excludedPaths = ["/my-courses", "/profile"];
  const shouldShowSearchBar = !excludedPaths.some((path) =>
    location.pathname.includes(path)
  );

  const shouldShowFooter =
    !location.pathname.includes("my-courses") &&
    !location.pathname.includes("display-lecture") &&
    !location.pathname.includes("updatelecture") &&
    !location.pathname.includes("course/update") &&
    !location.pathname.includes("course/create") &&
    !location.pathname.includes("addlecture") &&
    !location.pathname.includes("profile") &&
    !location.pathname.includes("login") &&
    !location.pathname.includes("signup") &&
    !location.pathname.includes("admin") &&
    !location.pathname.includes("password");

  const shouldShowFaqs =
    location.pathname.includes("/courses") || location.pathname == "/";

  return (
    <>
      {shouldShowNavbar && <Navbar showSearchBar={shouldShowSearchBar} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />

        <Route element={<NotRequireAuth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={["USER", "ADMIN"]} />}>
          <Route path="/course/:courseName" element={<CoursesDetails />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/checkout/fail" element={<CheckoutFail />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route
            path="/course/display-lecture/:courseName"
            element={<DisplayLecture />}
          />
        </Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route
            path="/course/create"
            element={<CourseCreate update={false} />}
          />
          <Route
            path="/course/update/:courseId"
            element={<CourseCreate update={true} />}
          />
          <Route path="/course/addlecture/:courseId" element={<AddLecture />} />
          <Route
            path="/course/updatelecture/:courseId/:lectureNo"
            element={<UpdateLecture />}
          />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>

      {/* faqa */}
      {shouldShowFaqs && <Faqs />}

      {/* footer */}
      {shouldShowFooter && <Footer />}
    </>
  );
}
