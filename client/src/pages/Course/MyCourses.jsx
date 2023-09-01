import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

// component import
import Loading from '../../components/loading/Loading'

export default function MyCourses() { 
  const { data } = useSelector((state) => state.auth);
  const { coursesData, isLoading } = useSelector((state) => state.course);

  if(isLoading) {
    return <Loading />
  }
   return (
    // section for my courses
    <section className="py-5 flex flex-col gap-14">
      {/* header */}
      <header>
        <h1 className="lg:text-4xl md:text-3xl font-[600] text-2xl text-orange-500">
          Enrolled Courses
        </h1>
        <hr className="lg:h-2 md:h-2 h-1.5 w-36 mt-1 rounded-md bg-[var(--primary-bg)]" />
      </header>
      {/* course container, show all the enrolled courses, if no any course buying user then show not any enrolled courses */}
      <div className="">
        {data?.subscription?.status === "active" || data?.role === "ADMIN" ? (
          <ul className="flex flex-wrap gap-10">
            {coursesData.map((course) => (
              // course wrapper
              <li
                key={course?._id}
                className="lg:w-[250px] md:w-[250px] lg:h-[210px] lg:h[210px] h-auto w-[100%] overflow-hidden text-ellipsis"
              >
                <NavLink
                  to={`/course/display-lecture/${course?.title?.replaceAll(" ", "-")}`}
                  className="flex flex-col gap-2"
                >
                  <img
                    src={course?.thumbnail?.secure_url}
                    alt={`${course?.title}-Thumbnail`}
                    className="lg:h-[150px] md:h-[150px]  w-[100%] h-auto rounded-lg"
                  />
                  <h6 className="text-lg text-gray-900 font-semibold">
                    {course?.title}
                  </h6>
                </NavLink>
              </li>
            ))}
          </ul>
        ) : (
          <p>Not Any Enrolled courses Find</p>
        )}
      </div>
    </section>
  );
}
