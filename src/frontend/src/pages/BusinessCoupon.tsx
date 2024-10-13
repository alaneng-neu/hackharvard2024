import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthNavbar from "../components/AuthNavbar";
import { Coupon } from "../../../shared";
import { promotionToString } from "../utils/business.utils";

const BusinessCoupon: React.FC = () => {
  const navigate = useNavigate();
  const { id, couponId } = useParams();
  const [coupon, setCoupon] = useState<Coupon>();

  useEffect(() => {
    fetch(`http://localhost:7071/business/${id}/promos/${couponId}`)
      .then((res) => res.json())
      .then((data) => {
        setCoupon(data);
      });
  });

  const handleAccept = () => {
    fetch(`http://localhost:7071/business/${id}/promos/${couponId}/use`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data: Coupon) => {
        setCoupon(data);
      });
  };

  const handleDecline = () => {
    navigate("/user");
  };

  if (!coupon) {
    return <div className="text-center mt-8">Coupon not found</div>;
  }

  return (
    <div>
      <AuthNavbar />
      <div className="max-w-md mx-auto mt-8 p-4 border rounded-lg shadow-lg bg-white">
        <h2 className="text-xl font-bold mb-2">
          Coupon at {coupon.promotion.business.name}
        </h2>
        <p className="text-gray-600 mb-4">
          {promotionToString(coupon.promotion)}
        </p>
        {coupon.redeemedAt && (
          <div className="mb-2">
            <p className="font-semibold">Redeemed At:</p>
            <p className="text-sm text-gray-600">
              {new Date(coupon.redeemedAt).toLocaleString()}
            </p>
          </div>
        )}
        <div className="mt-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            onClick={handleAccept}
            disabled={!!coupon.redeemedAt} // Disable if already redeemed
          >
            Accept
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleDecline}>
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessCoupon;
