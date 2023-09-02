import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CardSkeleton() {
  return (
    <div className="course p-0">
      <div className="image">
        <Skeleton height={200} />
      </div>
      <div className="details">
        <h4>
          <Skeleton width={200} />
        </h4>
        <p className="teacher">
          <Skeleton width={100} />
        </p>
        <p>
          <Skeleton width={150} />
        </p>
      </div>
      <div className="price">
        <Skeleton width={80} />
      </div>
      <div className="btn-container">
        <button className="bg-[#ce06e021]">
          <Skeleton width={120} height={30} />
        </button>
        <button className="bg-[#ce06e025]">
          <Skeleton width={130} height={30} />
        </button>
      </div>
    </div>
  );
}
