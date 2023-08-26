import React from 'react';
import NotFoundImg from '../assets/not-found.png';  

export default function PageNotFound() {
  return (
    <section className="flex justify-center items-center h-screen w-screen py-0 bg-transparent">
      <img src={NotFoundImg} alt="notFound" className="w-[500px] max-w-1/2 " />
    </section>
  );
}
