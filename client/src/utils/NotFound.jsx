import React from "react";
import notFoundGif from "../assets/no-found.gif";

export default function NotFound({ text }) {
  return (
    <div className="h-[90vh] w-screen flex justify-center items-center">
      <div className="flex flex-col gap-4 p-10 justify-center items-center">
        <img
          src={notFoundGif}
          alt="not-Found"
          className="max-w-[500px] w-[80%]"
        />
        <h2 className="text-gray-600 text-4xl md:text-center first-letter:text-5xl font-semibold font-mono">
          {text}
        </h2>
      </div>
    </div>
  );
}
