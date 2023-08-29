import React, { useEffect } from "react";
import { MdSubscriptions } from "react-icons/md";
import subscriptionVideo from "../../assets/subscription.mp4";
import { BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../Redux/authSlice";
import {
  getRazorPayId,
  purchaseCourseBundle,
  verifyUserPayment,
} from "../../Redux/razorpaySlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const razorPayKey = useSelector((state) => state.razorpay.key);
  const subscription_id = useSelector(
    (state) => state.razorpay.subscription_id
  );
  const userData = useSelector((state) => state.auth.data);
  const { isPaymentVerified } = useSelector((state) => state.razorpay);

  useEffect(() => {
    (async () => {
      await dispatch(getRazorPayId());
      await dispatch(purchaseCourseBundle());
    })();
  }, []);

  // for storing the payment details after successfull transaction
  const paymentDetails = {
    razorpay_payment_id: "",
    razorpay_subscription_id: "",
    razorpay_signature: "",
  };

  const handleSubscription = async (event) => {
    event.preventDefault();

    // checking for empty payment credential
    if (!razorPayKey || !subscription_id) {
      console.log("no", razorPayKey, subscription_id);
      return;
    }

    const options = {
      key: razorPayKey,
      subscription_id: subscription_id,
      name: "LMSskills Pvt. Ltd.",
      description: "Yearly Subscription",
      handler: async function (response) {
        paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
        paymentDetails.razorpay_subscription_id =
          response.razorpay_subscription_id;
        paymentDetails.razorpay_signature = response.razorpay_signature;

        // displaying the success message
        toast.success("Payment Successfull");

        // verifying the payment
        const res = await dispatch(verifyUserPayment(paymentDetails));

        // redirecting the user according to the verification status
        isPaymentVerified
          ? (dispatch(getUserData()), navigate("/checkout/success"))
          : navigate("/checkout/fail");
      },
      prefill: {
        name: userData?.fullName,
        email: userData?.email,
      },
      theme: {
        color: "#F37254",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    // checkout page container
    <section className="min-h-screen bg-white flex justify-center pt-10 pb-7 px-5">
      <form
        onSubmit={handleSubscription}
        className="flex flex-col gap-2 h-fit px-7 w-[100%]  lg:w-[70%] py-8 rounded-lg shadow-custom"
      >
        {/* header */}
        <h4 className="text-3xl p-2 border-b-2 border-[var(--primary-bg)] text-gray-700 font-semibold">
          Subscription <span className="text-[var(--primary-bg)]">Bundle</span>
        </h4>
        {/* Notice */}
        <div className="h-fit flex flex-col lg:flex-row justify-around lg:gap-10 sm:gap-0 py-5">
          <div className="h-[210px] flex flex-col lg:items-start sm:items-center">
            <video
              src={subscriptionVideo}
              autoPlay
              loop
              muted
              className="h-[80%]"
            ></video>
            <h5 className="flex gap-2 items-center text-lg text-blue-500 font-[700]">
              Pay Now <MdSubscriptions />
            </h5>
          </div>
          {/* guide line */}
          <div className="p-6 lg:px-11 border-[0.5px] relative border-red-300 rounded-sm shadow-sm rotate-7">
            <ul className="flex flex-col gap-2 items-start list-disc">
              <li className="text-red-600 text-base font-semibold opacity-80">
                100% refund at cancellation
              </li>
              <li className="text-red-600 text-base font-semibold opacity-80">
                Terms & Condition Applied
              </li>
            </ul>
            <span className="px-6  py-1 bg-red-400 text-white text-base font-[600] rounded-sm absolute -top-2 -right-3  skew-y-12">
              Note
            </span>
          </div>
        </div>

        <p className="text-lg py-3 text-gray-700">
          This purchase will allow you to access all the available courses of
          our platform for
          <span className="text-[var(--primary-bg)] font-bold">
            {" "}
            1 Year Duration
          </span>
          . <br />
          <span className="text-xl font-800">
            All the existing and new launched courses will be available to you
            in this subscription bundle
          </span>
        </p>
        {/* submit button */}
        <div className="flex gap-5 items-center mt-2 justify-evenly w-[100%]">
          <p className="flex items-center justify-center rounded-lg gap-1 w-[40%] sm:w-[50%] py-4 shadow-lg lg:text-2xl sm:text-[20px] font-bold text-yellow-500">
            <BiRupee /> <span>499</span>only
          </p>
          <div className="w-[1.7px] h-[50px] bg-gray-200"></div>
          <button
            className="bg-green-500 w-[50%] py-3.5 text-xl text-white"
            type="submit"
          >
            Subscribe
          </button>
        </div>
      </form>
    </section>
  );
};

export default Checkout;
