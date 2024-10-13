import React, { useState, useEffect } from "react";
import AuthNavbar from "../components/AuthNavbar";

interface Coupon {
  id: string;
  promotion: {
    id: string;
    title: string;
    description: string;
  };
  user: {
    id: string;
    name: string;
    email: string;
  };
  redeemedAt: string | null;
}

// Test data for the coupon
const testCoupon: Coupon = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  promotion: {
    id: "789e0123-e45b-67d8-a901-234567890000",
    title: "50% Off at Joe's Coffee",
    description:
      "Get half off your next coffee purchase at Joe's Coffee Shop. Valid for any size drink.",
  },
  user: {
    id: "456e7890-e12b-34d5-a678-901234567000",
    name: "John Doe",
    email: "john.doe@example.com",
  },
  redeemedAt: null,
};

const CouponInfo: React.FC = () => {
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with a delay
    const timer = setTimeout(() => {
      setCoupon(testCoupon);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleRedeem = () => {
    if (coupon) {
      setCoupon((prev) => ({
        ...prev!,
        redeemedAt: new Date().toISOString(),
      }));
    }
  };

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
        <h2 className="text-xl font-bold mb-2">{coupon.promotion.title}</h2>
        <p className="text-gray-600 mb-4">{coupon.promotion.description}</p>
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
        <button
          className={`w-full py-2 rounded-lg text-white ${
            coupon.redeemedAt
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          onClick={handleRedeem}
          disabled={!!coupon.redeemedAt}
        >
          {coupon.redeemedAt ? "Redeemed" : "Redeem Coupon"}
        </button>
      </div>
    </div>
  );
};

export default CouponInfo;
