import React from "react";
import { RxCrossCircled } from "react-icons/rx";
import { Link } from "react-router-dom";

const CheckoutFail = () => {
  return (
    // payment failed container
    <section className="flex justify-center w-full pt-16 pb-0 h-min-[90vh] relative bg-white">
      <div className="flex flex-col gap-4 items-center w-[100%]">
        <span className="p-2 text-8xl text-red-500 rounded-full shadow-md">
          <RxCrossCircled />
        </span>
        <h2 className="text-3xl text-gray-600 font-extrabold">
          Oh no, your payment{" "}
          <span className="font-bold text-red-500">Failed !!</span>
        </h2>

        <p className="text-base text-gray-500 font-semibold">
          Please try it again as it can be a temporary issue.
        </p>

        {/* going back to payment page again */}
        <Link
          className="bg-slate-50 hover:bg-red-50 mt-7 transition-all ease-in-out duration-300  w-[95%] text-center py-16 pb-20 h-[40%] text-xl font-bold rounded-bl-lg rounded-br-lg"
          to={"/checkout"}
        >
          <button className="px-24 py-4 skew-x-6 text-lg font-semibold">
            Revisit Payment
          </button>
        </Link>
      </div>
    </section>
  );
};

export default CheckoutFail;
