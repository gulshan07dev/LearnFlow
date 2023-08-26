import React, { useState } from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import contactImg from "../../assets/contact.svg";
import axios from "axios";
import { toast } from "react-toastify";
import "./contact.css";

export default function Contact() {
  // State for form fields
  const [activeTab, setActiveTab] = useState("course");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("Course Enquiry"); // Default subject
  const [orgName, setOrgName] = useState("");

  // Handle tab click
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    // Set subject based on tab selection
    setSubject(tab === "course" ? "Course Enquiry" : "Corporate Enquiry");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Show loading message
    const loadingMessage = toast.loading("Sending Your Message...");

    try {
      const response = await axios.post(
        "http://localhost:500/api/v1/contact",
        {
          fullName,
          email,
          message,
          subject,
          orgName,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // Show success message
      toast.update(loadingMessage, {
        render: response.data.message,
        type: "success",
        autoClose: 1000,
        isLoading: false,
      });
      setFullName("");
      setEmail("");
      setMessage("");
      setOrgName("");
    } catch (error) {
      console.error(error);
      // Show error message
      toast.update(loadingMessage, {
        render: error.response?.data?.message || "An error occurred.",
        type: "error",
        closeButton: true,
        autoClose: 3000,
        isLoading: false,
      });
    }
  };

  return (
    <section className="bg-white py-[50px] lg:py-12 flex flex-col md:flex-row justify-between lg:flex-row gap-2">
      {/* Contact Information */}
      <div className="pb-4 flex flex-col gap-[3px] w-[100%] lg:w-[50%]">
        {/* ... (contact details) */}
        <h1 className="section-heading">Contact Us</h1>
        <h6 className="text-base medium:text-lg leading-6 lg:w-[65%] md:w-[90%] w-[95%] medium:leading-[26px] font-normal text-gray-500 p-1 pb-2 regular:!pb-3">
          For any queries, Please reach out to us. Our Support team will get
          back to you within 24 hours.
        </h6>
        <a
          href="mailto:sunnyku0301@gmail.com"
          className="text-sm medium:text-sm leading-5 medium:leading-[22px] font-normal text-gray-600 p-2 regular:!pb-3"
        >
          <FaEnvelope className="inline" /> support@lmsskills.com
        </a>
        <a
          href="tel:+1234567890"
          className="text-sm medium:text-sm leading-5 medium:leading-[22px] font-normal text-gray-600 p-2 regular:!pb-3"
        >
          <FaPhone className="inline" /> +1 (234) 567-890
        </a>
        <img
          src={contactImg}
          alt="employeeImg"
          className="lg:w-[80%] w-[60%] self-center"
        />
      </div>

      {/* Contact Form */}
      <div className="w-[100%] py-8 lg:w-[50%] shadow-sm shadow-custom p-3 lg:p-16 md:p-5 lg:rounded-xl lg:mt-5">
        {/* Tab Selection */}
        <div className="flex gap-6 w-[100%]">
          {/* ... (tab options) */}
          <h6
            className={`text-base medium:text-lg leading-6 medium:leading-[26px] font-semibold ${
              activeTab === "course"
                ? "text-orange-500 underline underline-offset-8 cursor-pointer"
                : "text-gray-500 cursor-pointer"
            }`}
            onClick={() => handleTabClick("course")}
          >
            Course Enquiry
          </h6>
          <h6
            className={`text-base medium:text-2xl leading-6 medium:leading-[26px] font-semibold ${
              activeTab === "corporate"
                ? "text-orange-500 underline underline-offset-8 cursor-pointer"
                : "text-gray-500 cursor-pointer"
            }`}
            onClick={() => handleTabClick("corporate")}
          >
            Corporate Enquiry
          </h6>
        </div>

        {/* Main Form */}
        <form
          className="w-[100%] mt-10 flex flex-col gap-10"
          onSubmit={handleSubmit}
        >
          {/* Full Name */}
          <div className="relative">
            <input
              className="myinput w-full border-b-2 border-gray-300 text-gray-600 text-base focus:border-blue-500 focus:outline-none"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              id="fullname"
              autoComplete="off"
              required
            />
            <label
              htmlFor="fullname"
              className={`absolute left-2  transition-all text-gray-600 text-lg opacity-80 pointer-events-none origin-[0%]`}
            >
              Full Name
            </label>
          </div>

          {/* Email Address */}
          <div className="relative">
            <input
              className="myinput w-full border-b-2 border-gray-300 text-gray-600 text-base focus:border-blue-500 focus:outline-none"
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              id="email"
              autoComplete="off"
              required
            />
            <label
              htmlFor="fullname"
              className={`absolute left-2  
              transition-all text-gray-600 text-lg opacity-80 pointer-events-none origin-[0%]`}
            >
              Email
            </label>
          </div>

          {/* Organisation Name (conditionally rendered) */}
          {activeTab === "corporate" && (
            <div className="relative">
              <input
                className="myinput w-full border-b-2 border-gray-300  text-gray-600 text-base focus:border-blue-500 focus:outline-none"
                type="text"
                id="org"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                autoComplete="off"
                required
              />
              <label
                htmlFor="org"
                className={`absolute left-2  
                transition-all text-gray-600 text-lg opacity-80 pointer-events-none origin-[0%]`}
              >
                Organisation Name
              </label>
            </div>
          )}

          {/* Message */}
          <div className="relative">
            <textarea
              className="mytextarea w-full  text-gray-600 text-base border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none "
              rows={5}
              cols={10}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              autoComplete="off"
              required
            />
            <label
              className={`absolute left-5  
              transition-all text-gray-600 text-lg opacity-80 pointer-events-none origin-[0%]`}
            >
              Your Message
            </label>
          </div>

          {/* Submit Button */}
          <button
            className="w-[100%] lg:max-w-fit lg:px-10 bg-[var(--primary-bg)]"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
