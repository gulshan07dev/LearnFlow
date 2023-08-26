import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const CheckoutSuccess = () => {
  return (
    //  container for checkout success card
    <section className="flex justify-center w-full pt-16 pb-0 h-min-[90vh] relative bg-white">
      <div className="flex flex-col gap-4 items-center w-[100%]">
        <span className="p-2 text-8xl text-green-500 rounded-full shadow-md">
          <AiFillCheckCircle />
        </span>
        <h2 className="text-3xl text-gray-600 font-extrabold text-center">
          🎉Congratualation, your payment{" "}
          <span className="font-bold text-green-500">Successfull !!</span>
        </h2>

        <p className="text-base text-gray-500 font-semibold text-center mt-2">
          👋🏻 Welcome to the Pro Bundle
        </p>

        {/* going back to dashboard page   */}
        <div className="bg-slate-50 hover:bg-green-50 mt-7 transition-all ease-in-out duration-300  w-[95%] text-center py-16 pb-20 h-[45%] text-xl font-bold rounded-bl-lg rounded-br-lg px-3 flex items-center flex-col gap-5">
          <p className="text-base text-gray-400 ">
            Now you can enjoy the taste of learning from our vast library of
            courses from the top subject matter experts of the industry
          </p>
          <Link to={"/my-courses"}>
            <button className="px-24 py-4 skew-x-6 text-lg font-semibold">
              Go to Dashboard
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CheckoutSuccess;
