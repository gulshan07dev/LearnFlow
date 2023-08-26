import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { logout } from "../../Redux/authSlice";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";
import Modal from "react-modal";
import Logo from "../Logo";
import {
  FaSearch,
  FaUserCircle,
  FaChalkboardTeacher,
  FaUser,
  FaSignOutAlt,
  FaInfoCircle,
  FaEnvelope,
} from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";

export default function Navbar({ showSearchBar }) {
  const { isLoggedIn, data, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle profile icon click to open/close modal
  const handleProfileClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Handle user logout
  const handleLogout = async () => {
    const res = await dispatch(logout());

    // redirect to home page if loggedout successfully
    if (res?.payload?.success) navigate("/");

    setIsModalOpen(false);
  };

  return (
    <nav>
      {/* Logo */}
      <Logo />

      {/* Search bar */}
      {showSearchBar ? (
        <div className="search-bar">
          <FaSearch />
          <input type="text" placeholder="Search by product title" />
        </div>
      ) : (
        ""
      )}

      {/* User profile and modal */}
      {isLoggedIn ? (
        <div className="profile">
          {data?.avatar?.secure_url ? (
            <img
              src={data?.avatar?.secure_url}
              alt="profile-image"
              onClick={handleProfileClick}
            />
          ) : (
            <FaUserCircle onClick={handleProfileClick} />
          )}

          {/* Modal */}
          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            className="custom-modal"
            overlayClassName="custom-modal-overlay"
          >
            <div className="modal-content">
              {/* user profile */}
              <div>
                {data?.avatar?.secure_url ? (
                  <img src={data?.avatar?.secure_url} alt="avatar" />
                ) : (
                  <FaUserCircle />
                )}
                <h2>{data?.fullName}</h2>
              </div>
              {/* Modal: options */}
              <ul>
                {/* Admin option */}
                {role === "ADMIN" && (
                  <li onClick={() => setIsModalOpen(false)}>
                    <NavLink to={"/admin/dashboard"} className="modal-option">
                      <RxDashboard className="modal-icon" /> ADMIN DASHBOARD
                    </NavLink>
                  </li>
                )}

                {/* My courses option */}
                <li onClick={() => setIsModalOpen(false)}>
                  <NavLink to={"/my-courses"} className="modal-option">
                    <FaChalkboardTeacher className="modal-icon" />
                    My Courses
                  </NavLink>
                </li>

                {/* Profile option */}
                <li onClick={() => setIsModalOpen(false)}>
                  <NavLink to={"/user/profile"} className="modal-option">
                    <FaUser className="modal-icon" /> Profile
                  </NavLink>
                </li>

                {/* about option */}
                <li onClick={() => setIsModalOpen(false)}>
                  <NavLink to={"/about-us"} className="modal-option">
                    <FaInfoCircle className="modal-icon" /> About Us
                  </NavLink>
                </li>

                {/* contact option */}
                <li onClick={() => setIsModalOpen(false)}>
                  <NavLink to={"/contact-us"} className="modal-option">
                    <FaEnvelope className="modal-icon" /> Contact Us
                  </NavLink>
                </li>

                {/* Logout option */}
                <li
                  className="modal-option font-[600] text-[#e71818]"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="modal-icon font-[600] text-[#e71818]" />{" "}
                  Logout
                </li>
              </ul>
            </div>
          </Modal>
        </div>
      ) : (
        // Login/Register button
        <button onClick={() => navigate("/login")}>Login/Register</button>
      )}
    </nav>
  );
}
