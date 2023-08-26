import React, { useState } from "react";
import Collapse from "react-collapse";
import "./faqs.css"; // You can create your own CSS file for styling

const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    { question: "I am not able to view my enrolled course. What to do/whom to contact ?", answer: `Contact our counselors through the chat support on our website. Look for the chat option on the bottom right of the Homepage. Name the course you’re interested in, and the counseling team will guide you through the admission process.
    Connect with our support team through the chat option in your enrolled course dashboard. Simply log in, enter the course dashboard, and find the chat option on the bottom left of the screen. Our technical support team will assist you with any technical or course-related queries. You can also reach us at support@pwskills.com.
    To access your enrolled course, ensure you have logged in at learn.pwskills.com. If the course is still not visible, email your payment receipt to support@pwskills.com for assistance within 24 hours.` },
    { question: "How to get Placements and Job assistance ?", answer: "For job placements and assistance: Enroll in our job assurance program for resume building, mock interviews, job referrals, and an assured job opportunity. Opt for our job assistance course for resume building, mock interviews, and job alerts (job assurance not included)." },
    { question: "Can I cancel my subscription?", answer: `Contact our counselors through the chat support on our website. Look for the chat option on the bottom right of the Homepage. Name the course you’re interested in, and the counseling team will guide you through the admission process.
    Connect with our support team through the chat option in your enrolled course dashboard. Simply log in, enter the course dashboard, and find the chat option on the bottom left of the screen. Our technical support team will assist you with any technical or course-related queries. You can also reach us at support@pwskills.com.
    To access your enrolled course, ensure you have logged in at learn.pwskills.com. If the course is still not visible, email your payment receipt to support@pwskills.com for assistance within 24 hours.` },
    // Add more FAQs here
  ];

  const handleToggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="faq-container">
      <h1 className="font-semibold text-3xl lg:text-4xl">Frequently Asked Questions</h1>
      {faqs.map((faq, index) => (
        <div key={index} className="faq-item">
          <div
            className={`faq-question ${activeIndex === index ? "active" : ""}`}
            onClick={() => handleToggle(index)}
          >
            {faq.question}
          </div>
          <Collapse isOpened={activeIndex === index}>
            <div className="faq-answer">{faq.answer}</div>
          </Collapse>
        </div>
      ))}
    </section>
  );
};

export default Faqs;
