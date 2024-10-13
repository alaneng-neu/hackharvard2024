import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import AuthNavbar from "../components/AuthNavbar";

const BusinessCoupon: React.FC = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const couponId = "123e4567-e89b-12d3-a456-426614174000"; // Example ID
  const [redeemedAt, setRedeemedAt] = useState<string | null>(null); // State to track when the coupon was redeemed
  const coupon = {
    id: couponId,
    title: "50% Off at Joe's Coffee",
    description:
      "Get half off your next coffee purchase at Joe's Coffee Shop. Valid for any size drink.",
  };

  const handleAccept = () => {
    // Set the redeemedAt state to the current date and time
    setRedeemedAt(new Date().toISOString());
    console.log(
      `Coupon ${couponId} accepted. Redeemed at ${new Date().toLocaleString()}.`
    );
  };

  const handleDecline = () => {
    // Redirect to the user page when the coupon is declined
    navigate("/user"); // Replace with the actual route to the user page
    console.log(`Coupon ${couponId} declined.`);
  };

  return (
    <div>
      <AuthNavbar />
      <div className="max-w-md mx-auto mt-8 p-4 border rounded-lg shadow-lg bg-white">
        <h2 className="text-xl font-bold mb-2">{coupon.title}</h2>
        <p className="text-gray-600 mb-4">{coupon.description}</p>
        {redeemedAt && (
          <div className="mb-2">
            <p className="font-semibold">Redeemed At:</p>
            <p className="text-sm text-gray-600">
              {new Date(redeemedAt).toLocaleString()}
            </p>
          </div>
        )}
        <div className="mt-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            onClick={handleAccept}
            disabled={!!redeemedAt} // Disable if already redeemed
          >
            Accept
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleDecline}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessCoupon;
