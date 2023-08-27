import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { FaUsers } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { FcSalesPerformance } from "react-icons/fc";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";
import { MdOutlineModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourse, getAllCourses } from "../../Redux/courseSlice";
import { getStatsData } from "../../Redux/statSlice";
import { getPaymentRecord } from "../../Redux/razorpaySlice";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allUsersCount, subscribedUsersCount } = useSelector(
    (state) => state.stat
  );

  const { allPayments, finalMonths } = useSelector(
    (state) => state.razorpay
  );

  const monthlySalesRecord = [1, 3, 6, 10, 0, 1, 4, 3, 7, 4, 2, 1]

  const userData = {
    labels: ["Registered User", "Enrolled User"],
    datasets: [
      {
        label: "User Details",
        data: [allUsersCount, subscribedUsersCount],
        backgroundColor: ["blue", "#12e912"],
        borderColor: ["blue", "#12e912"],
        borderWidth: 5,
      },
    ],
  };

  const salesData = {
    labels: [
      "January",
      "Febraury",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    fontColor: "black",
    datasets: [
      {
        label: "Sales / Month",
        data: monthlySalesRecord,
        backgroundColor: ["#12e912"],
        borderColor: ["white"],
        borderWidth: 2,
      },
    ],
  };

  // getting the courses data from redux toolkit store
  const myCourses = useSelector((state) => state.course.coursesData);

  // function to handle the course delete
  const handleCourseDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete the course?")) {
      const res = await dispatch(deleteCourse(id));

      // fetching the new updated data for the course
      if (res.payload.success) {
        await dispatch(getAllCourses());
      }
    }
  };

  useEffect(() => {
    (async () => {
      await dispatch(getAllCourses());
      await dispatch(getStatsData());
      await dispatch(getPaymentRecord());
    })();
  }, []);

  return (
    // Dashboard section
    <section className="py-5 lg:py-10 flex flex-col gap-7 bg-slate-50">
      <h1 className="text-center text-3xl text-gray-700 font-semibold">
        Welcome To Your{" "}
        <span className="text-[var(--primary-bg)]">Admin Dashboard</span>
      </h1>
      <div className="flex flex-col gap-14">
        {/* creating the records card and chart for sales and user details */}
        <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-12 gap-7 m-auto lg:mx-10 mx-2">
          {/* displaying the users chart and data */}
          <div className="flex flex-col items-center  gap-5  lg:px-6 px-4 lg:py-8 py-7 shadow-custom bg-[#f4d3ff] rounded-md">
            {/* for displaying the pie chart */}
            <div className="w-full h-60">
              <Pie
                className="pb-3 px-2.5"
                data={userData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </div>

            {/* card for user data */}
            <div className="grid grid-cols-2 lg:gap-7 gap-3.5 w-[100%]">
              {/* card for registered users */}
              <div className="flex items-center flex-col bg-[#eff2ff] justify-between lg:h-[130px] h-[100px] lg:p-5 p-3 lg:gap-3 gap-2 rounded-md shadow-sm hover:shadow-xl">
                <p className="font-extrabold lg:text-[18px] pb-1.5 w-[100%] text-center text-[12px] text-black-900 border-b-[1.4px] border-[var(--primary-bg)]">
                  Registered Users
                </p>
                <div className="flex justify-around gap-1.5 items-center  w-[100%]">
                  <h3 className="lg:text-2xl text-lg lg:p-2 px-1 py-0 h-fit font-semibold   w-[75%]   text-gray-700 overflow-x-scroll">
                    {allUsersCount}
                  </h3>
                  <FaUsers className="text-blue-800 text-5xl" />
                </div>
              </div>

              {/* card for enrolled users */}
              <div className="flex items-center flex-col bg-white justify-between lg:h-[130px] h-[100px] lg:p-5 p-3 lg:gap-3 gap-2 rounded-md shadow-sm hover:shadow-xl">
                <p className="font-extrabold lg:text-[18px] pb-1.5 w-[100%] text-center text-[12px] text-black-900 border-b-[1.4px] border-gray-300">
                  Subscribed Users
                </p>
                <div className="flex justify-around gap-1.5 items-center   w-[100%]">
                  <h3 className="lg:text-2xl text-lg lg:p-2 px-1 py-0 h-fit font-semibold   w-[75%]   text-gray-700 overflow-x-scroll">
                    {subscribedUsersCount}
                  </h3>
                  <FaUsers className="text-green-500 text-5xl drop-shadow-[2px 12px 15px to-blue-600" />
                </div>
              </div>
            </div>
          </div>

          {/* displaying the sales chart and data */}
          <div className="flex flex-col items-center gap-5 bg-[#FFF9ED]] lg:px-6 px-4 lg:py-8 py-7 shadow-custom rounded-md">
            {/* for displaying the bar chart */}
            <div className="h-60 relative w-full">
              <Bar
                data={salesData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </div>

            {/* card for user data */}
            <div className="grid grid-cols-2 lg:gap-7 gap-3.5 w-[100%]">
              {/* card for registered users */}
              <div className="flex items-center flex-col bg-gradient-to-r from-[#a6adff] to-[#5678ff] transform justify-between lg:h-[130px] h-[100px] lg:p-5 p-3 lg:gap-3 gap-2 rounded-md shadow-sm hover:shadow-xl">
                <p className="font-extrabold lg:text-[18px] pb-1.5 w-[100%] text-center text-[12px] text-black-900 border-b-[1.4px] border-gray-300">
                  Subscriptions Count
                </p>
                <div className="flex justify-around gap-1.5 items-center  w-[100%]">
                  <h3 className="lg:text-2xl text-lg lg:p-2 px-1 py-0 h-fit font-semibold   w-[75%]   text-gray-700 overflow-x-scroll">
                    {allPayments?.count}
                  </h3>
                  <FcSalesPerformance className="text-yellow-500 text-5xl drop-shadow-[2px 12px 15px blue" />
                </div>
              </div>

              {/* card for enrolled users */}
              <div className="flex items-center flex-col bg-gradient-to-r from-[#a6ffb9] to-[#b1ffdb] transform  justify-between lg:h-[130px] h-[100px] lg:p-5 p-3 lg:gap-3 gap-2 rounded-md shadow-sm hover:shadow-xl">
                <p className="font-extrabold lg:text-[18px] pb-1.5 w-[100%] text-center text-[12px] text-black-900 border-b-[1.4px] border-gray-300">
                  Total Revenue
                </p>
                <div className="flex justify-around gap-1.5 items-center  w-[100%]">
                  <h3 className="lg:text-2xl text-lg lg:p-2 px-1 py-0 h-fit font-semibold   w-[75%]   text-gray-700 overflow-x-scroll">
                    {subscribedUsersCount * 499}
                  </h3>
                  <GiMoneyStack className="text-green-500 text-5xl drop-shadow-[2px 12px 15px blue" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CRUD courses section */}
        <div className="lg:mx-[10%] mx-0 w-[100%] rounded-xl shadow-custom py-5 lg:px-7 px-2 self-center flex flex-col items-start justify-center gap-10 mb-10">
          {/* create course button and heading */}
          <div className="flex w-full items-center justify-between pb-3 border-b-2 border-gray-200 ">
            <h1 className="text-center lg:text-3xl text-lg font-semibold">
              Courses Overview
            </h1>

            {/* add course card */}
            <button
              onClick={() => {
                navigate("/course/create");
              }}
              className="w-fit bg-[var(--primary-bg)] rounded-3xl py-2.5 lg:px-5 px-2.8 lg:font-semibold font-normal lg:text-lg text-[14px] cursor-pointer"
            >
              Create New Course
            </button>
          </div>

          {/* table */}
          <div className="w-full overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th>S No.</th>
                  <th>Course Title</th>
                  <th>Course Category</th>
                  <th>Instructor</th>
                  <th>Total Lectures</th>
                  <th>Course Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {myCourses?.map((element, index) => {
                  return (
                    <tr
                      key={element?._id}
                      className="text-center bg-white px-2 border-t h-[80px] border-b hover:bg-gray-100"
                      style={{ margin: "7px 0" }}
                    >
                      <td>{index + 1}</td>
                      <td>
                        <textarea
                          readOnly
                          className="w-auto h-auto bg-transparent resize-none"
                          value={element?.title}
                        ></textarea>
                      </td>
                      <td>{element?.category}</td>
                      <td>{element?.createdBy}</td>
                      <td>{element?.numberOfLectures}</td>
                      <td className="max-w-32 max-h-5 overflow-hidden text-ellipsis whitespace-nowrap">
                        <textarea
                          readOnly
                          className="w-28 h-auto bg-transparent resize-none  text-ellipsis"
                          value={element?.description}
                        ></textarea>
                      </td>

                      <td className="flex items-center gap-3 pt-4">
                        {/* to edit the course */}
                        <button
                          onClick={() =>
                            navigate(`/course/update/${element?._id}`)
                          }
                          className="text-base px-2 py-1 rounded-md font-bold"
                        >
                          <MdOutlineModeEdit />
                        </button>

                        {/* to delete the course */}
                        <button
                          onClick={() => handleCourseDelete(element._id)}
                          className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-30 text-base py-1 px-2 rounded-md font-bold"
                        >
                          <BsTrash />
                        </button>

                        {/* to CRUD the lectures */}
                        <button
                          onClick={() =>
                            navigate(
                              `/course/display-lecture/${element?.title.replaceAll(
                                " ",
                                "-"
                              )}`
                            )
                          }
                          className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-30 text-base py-1 px-2 rounded-md font-bold"
                        >
                          <BsCollectionPlayFill />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
