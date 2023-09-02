import React from "react";

// import className
import "./loading.css";

export default function Loading() {
  return (
    <section className="p-0 spinner-container bg-white overflow-hidden flex flex-col gap-5 justify-center items-center h-screen w-screen fixed top-0 z-[199]">
      <div className="loading-spinner"></div>
      <p className="text-base text-gray-500 font-normal">
        This may take a few seconds, please don't close this page.
      </p>
    </section>
  );
}
