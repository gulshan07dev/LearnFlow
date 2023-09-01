import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  // faqs Object Here...
  const faqs = [
    {
      question:
        "I am not able to view my enrolled course. What to do/whom to contact ?",
      answer: `Contact our counselors through the chat support on our website. Look for the chat option on the bottom right of the Homepage. Name the course you’re interested in, and the counseling team will guide you through the admission process.
    Connect with our support team through the chat option in your enrolled course dashboard. Simply log in, enter the course dashboard, and find the chat option on the bottom left of the screen. Our technical support team will assist you with any technical or course-related queries. You can also reach us at support@lmsskills.com.
    To access your enrolled course, ensure you have logged in at lms-learning-menagement-system.vercel.app. If the course is still not visible, email your payment receipt to support@lmsskills.com for assistance within 24 hours.`,
    },
    {
      question: "How to get Placements and Job assistance ?",
      answer:
        "For job placements and assistance: Enroll in our job assurance program for resume building, mock interviews, job referrals, and an assured job opportunity. Opt for our job assistance course for resume building, mock interviews, and job alerts (job assurance not included).",
    },
    {
      question: "Can I cancel my subscription?",
      answer: `Contact our counselors through the chat support on our website. Look for the chat option on the bottom right of the Homepage. Name the course you’re interested in, and the counseling team will guide you through the admission process.
    Connect with our support team through the chat option in your enrolled course dashboard. Simply log in, enter the course dashboard, and find the chat option on the bottom left of the screen. Our technical support team will assist you with any technical or course-related queries. You can also reach us at support@pwskills.com.
    To access your enrolled course, ensure you have logged in at lms-learning-menagement-system. If the course is still not visible, email your payment receipt to support@lmsskills.com for assistance within 24 hours.`,
    },
    // Add more FAQs here
  ];

  return (
    <section className="flex flex-col md:gap-5 gap-2 py-7 mt-7 bg-white">
      <h1 className="font-semibold text-3xl lg:text-4xl mb-2">
        Frequently Asked Questions
      </h1>
      {faqs.map((faq, idx) => {
        const isActive = activeIndex === idx;
        return (
          // item
          <div
            key={idx}
            className={`border-[1px] overflow-hidden transition-all ${
              isActive
                ? "mb-5 border-gray-600 bg-[#f8f9ffee] shadow-lg"
                : "mb-2 border-gray-300 shadow-[0 5px 15px #00000012]"
            }`}
          >
            <span
              className="md:text-xl text-lg p-5 flex gap-3 md:text-gray-700 text-gray-800 md:font-semibold font-medium cursor-pointer"
              onClick={() =>
                setActiveIndex((prevIndex) => (prevIndex === idx ? null : idx))
              }
            >
              {isActive ? (
                <FiChevronUp size={20} />
              ) : (
                <FiChevronDown size={20} />
              )}{" "}
              {faq.question}
            </span>
            <p
              className={`text-lg overflow-hidden bg-[#fafffe] text-gray-500 font-medium p-5 pt-3 border-t-[1px] transition-all border-gray-300 ${
                isActive ? "h-auto block opacity-100" : "h-0 hidden opacity-0"
              }`}
            >
              {faq.answer}
            </p>
          </div>
        );
      })}
    </section>
  );
};

export default Faqs;
