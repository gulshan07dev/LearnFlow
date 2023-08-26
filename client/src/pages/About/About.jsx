import React from "react";
import Layout from "../../layout/Layout";
import orgImg from "../../assets/organisation.jpeg";
import successImg from "../../assets/success.png";

export default function About() {
  return (
    <section className="py-5 lg:py-10">
      <h1 className="section-heading text-center">About Us</h1>
      <p className="py-5 lg:py-12 text-base text-left medium:text-base leading-[21px] medium:leading-6 font-normal text-gray-600  regular:!text-left pb-6">
        LMS Skills' mission is to permeate through every student/professional's
        outlook towards jobs and change their attitude and perspective from "How
        Can I Do It?" to "Of Course I Can Do It". We aim to do this by providing
        exceptional up skilling courses at affordable rates, while being
        tech-forward so anyone, anywhere can access and improve their ability to
        be successful in life.
      </p>
      <img
        src={orgImg}
        alt="organisation-Image"
        className="w-[100%] lg:w-[70%] lg:m-auto rounded-lg"
      />
      <h1 className="section-heading text-center mt-24">Our Mission</h1>
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <p className="py-5 lg:py-12 text-base  text-left  leading-[21px]  font-normal text-gray-600 w-[100%] lg:w-[60%]  regular:!text-left pt-14">
          PW Skills is the result of a continual effort to exponentially
          increase the employability of every Indian, irrespective of their
          socioeconomic status. With accessibility and affordability being the
          support structure of high-quality, industry-relevant courses, PW
          Skills aims to empower professionals and students alike to either
          jumpstart their careers or leverage existing skills with new,
          future-driven upgrades that will help them realise their full
          potential.
        </p>
        <img
          src={successImg}
          alt="success-Image"
          className=" w-[100%] lg:w-[35%]"
        />
      </div>
    </section>
  );
}
