import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import HeroSection from "../components/heroSection/HeroSection";
import AchieveSection from "../components/achievementSection/AchieveSection";
import Footer from "../components/footer/Footer";
import CoursesCrousel from "../components/coursesSection/CoursesCrousel";
import Faqs from "../components/faqs/Faqs";

export default function Home() {
  

  return (
    <>
      <HeroSection />
      <AchieveSection />
      <CoursesCrousel />  
    </>
  );
}
