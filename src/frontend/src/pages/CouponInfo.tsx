import React, { useState, useEffect } from "react";
import AuthNavbar from "../components/AuthNavbar";
import { Coupon } from "../../../shared";
import { useParams } from "react-router-dom";
import { useAuthenticatedView } from "../hooks/useAuthenticatedView";
import { promotionToString } from "../utils/business.utils";

const CouponInfo: React.FC = () => {
  useAuthenticatedView();

  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [loading, setLoading] = useState(true);
  const { couponId } = useParams<{ id: string; couponId: string }>();

  useEffect(() => {
    fetch(`http://localhost:7071/business/promos/${couponId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) throw new Error(data.message);
        setCoupon(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [couponId]);

  if (loading) {
    return (
      <div className="max-w-md mx-auto mt-8 p-4 border rounded-lg shadow-lg bg-white">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

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
        <div className="mb-2">
          <p className="font-semibold">Coupon ID:</p>
          <p className="text-sm text-gray-600">{coupon.id}</p>
        </div>
        <div className="mb-2">
          <p className="font-semibold">User:</p>
          <p className="text-sm text-gray-600">{coupon.user.name}</p>
        </div>
        <div className="mb-2">
          <p className="font-semibold">User Email:</p>
          <p className="text-sm text-gray-600">{coupon.user.email}</p>
        </div>
        {coupon.redeemedAt && (
          <div className="mb-2">
            <p className="font-semibold">Redeemed:</p>
            <p className="text-sm text-gray-600">
              {new Date(coupon.redeemedAt).toLocaleString()}
            </p>
          </div>
        )}
        {/* TODO: Add the QR code to be scanned by the business */}
      </div>
    </div>
  );
};

export default CouponInfo;
