import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import "./profile.css";
import InputField from "../../components/inputField/InputField";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { getUserData, updateProfile } from "../../Redux/authSlice";
import { cancelCourseBundle } from "../../Redux/razorpaySlice";

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.data);

  useEffect(() => {
    // Fetch user data when the component mounts
    dispatch(getUserData());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    fullName: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarChanged, setAvatarChanged] = useState(false);
  const avatarInputRef = useRef(null);
  const avatarImgRef = useRef(null);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName,
      });
    }
  }, [user]);

  useEffect(() => {
    const isChanged =
      formData.fullName !== (user?.fullName || "") || avatarChanged;
    setIsFormChanged(isChanged);
  }, [formData, avatarChanged, user]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAvatarChange = () => {
    avatarInputRef.current.click();
  };

  const handleAvatarFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    setAvatarChanged(true); // Set avatarChanged to true
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // checking the length of name
    if (formData.fullName.length < 3) {
      toast.error("Name should have more than 2 characters");
      return;
    }

    setIsSubmitting(true); // Start form submission

    const updatedData = new FormData();
    updatedData.append("fullName", formData.fullName);
    if (avatar) {
      updatedData.append("avatar", avatar);
    }

    const data = [user?._id, updatedData];

    await dispatch(updateProfile(data));

    // Fetch user data to update navbar profile
    await dispatch(getUserData());

    setIsSubmitting(false); // complete the submission
    setAvatarChanged(false); // Reset avatarChanged to false
  };

  const handleSubscriptionDeactivate = async () => {
    if (window.confirm("Are you sure to Deactivate your subscription bundle")) {
      const res = await dispatch(cancelCourseBundle());

      // Fetch user data
      if (res?.payload?.success) {
        await dispatch(getUserData());
      }
    }
  };

  return (
    <section className="profile-section">
      <div className="profile">
        <div className="upper-part">
          <div onClick={handleAvatarChange}>
            <AiOutlineEdit className="edit-btn" />
            {(user && user.avatar?.secure_url) || avatar ? (
              <img
                ref={avatarImgRef}
                src={
                  avatar
                    ? URL.createObjectURL(avatar)
                    : user?.avatar?.secure_url || ""
                }
                alt="profile"
                style={{ cursor: "pointer" }}
              />
            ) : (
              <FaUserCircle />
            )}
          </div>

          <h2 className="section-heading">My Profile</h2>
        </div>
        <form onSubmit={handleSubmit}>
          {/* avatar input */}
          <input
            style={{ display: "none" }}
            type="file"
            id="avatarInput"
            name="avatar"
            accept=".jpg, .jpeg, .png"
            ref={avatarInputRef}
            onChange={handleAvatarFileChange}
          />
          {/* full name input */}
          <InputField
            label={"Full Name"}
            type={"text"}
            name={"fullName"}
            value={formData.fullName}
            onChange={handleInputChange}
          />
          {/* user email */}
          <InputField
            label={"Email"}
            type={"email"}
            name={"email"}
            value={user?.email || ""}
            disabled={true}
          />
          {/* user role */}
          <InputField
            label={"Role"}
            type={"text"}
            name={"role"}
            value={user?.role || ""}
            disabled={true}
          />
          {/* user subscription */}
          <div className="w-[100%] flex justify-between rounded-[3px] border-[1px] bg-white border-[#00000025] shadow-sm">
            <InputField
              label={"Subscription"}
              type={"text"}
              name={"subscription"}
              value={user?.subscription?.status || "inactive"}
              disabled={true}
            />
            {/* subscription disable button showing if user subscribed*/}
            {user?.subscription?.status === "active" && (
              <button
                type="button"
                className="disable-btn w-[30%]"
                onClick={handleSubscriptionDeactivate}
              >
                Deactivate
              </button>
            )}
          </div>
          {/* update button */}
          <button
            className="submit-btn"
            type="submit"
            disabled={!isFormChanged || isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Profile"}
          </button>
          {/* change password link */}
          <NavLink className="change-pass-btn" to="/change-password">
            <AiOutlineEdit /> Change Password
          </NavLink>
        </form>
      </div>
    </section>
  );
}
