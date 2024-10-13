import { useState, useRef, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon, LogOutIcon } from "lucide-react";
import AuthNavbar from "../components/AuthNavbar";

// Mock data for the example
const user = {
  name: "John Doe",
  email: "john.doe@example.com",
  coupons: [
    {
      id: "1",
      promotion: { discount: "10%", business: { name: "Local Cafe" } },
      redeemedAt: null,
    },
    {
      id: "2",
      promotion: {
        discount: "Free Shipping",
        business: { name: "Online Store" },
      },
      redeemedAt: "2023-05-15T14:30:00Z",
    },
    {
      id: "3",
      promotion: { discount: "$5 off", business: { name: "BookStore" } },
      redeemedAt: null,
    },
    {
      id: "4",
      promotion: { discount: "15%", business: { name: "Fashion Outlet" } },
      redeemedAt: null,
    },
    {
      id: "5",
      promotion: {
        discount: "Buy 1 Get 1 Free",
        business: { name: "Pizza Place" },
      },
      redeemedAt: null,
    },
  ],
  businesses: [
    {
      id: "1",
      name: "John's Cafe",
      businessTypes: ["Restaurant", "Cafe"],
      description: "A cozy cafe in the heart of the city",
    },
    {
      id: "2",
      name: "JD Consulting",
      businessTypes: ["Service", "Consulting"],
      description: "Professional business consulting services",
    },
    {
      id: "3",
      name: "Doe's Hardware",
      businessTypes: ["Retail", "Home Improvement"],
      description: "Your one-stop shop for all hardware needs",
    },
    {
      id: "4",
      name: "Tech Solutions",
      businessTypes: ["IT", "Service"],
      description: "Innovative tech solutions for modern businesses",
    },
    {
      id: "5",
      name: "Green Thumb Nursery",
      businessTypes: ["Retail", "Gardening"],
      description: "Quality plants and gardening supplies",
    },
  ],
};

function CouponCarousel({ coupons }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef(null);

  const next = () => {
    if (currentIndex < coupons.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      const itemWidth = containerRef.current.offsetWidth / 3;
      setTranslateX(-currentIndex * itemWidth);
    }
  }, [currentIndex]);

  if (coupons.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Your Coupons</h2>
        <p className="text-gray-600">No coupons available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-2">Your Coupons</h2>
      <div className="relative">
        <div
          ref={containerRef}
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(${translateX}px)` }}
        >
          {coupons.map((coupon) => (
            <div key={coupon.id} className="w-1/3 flex-shrink-0 p-4">
              <div className="bg-white rounded-lg shadow p-4 h-full">
                <p className="font-bold text-lg">
                  {coupon.promotion.discount} off
                </p>
                <p className="text-gray-600">
                  at {coupon.promotion.business.name}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {coupon.redeemedAt
                    ? `Redeemed on ${new Date(
                        coupon.redeemedAt
                      ).toLocaleDateString()}`
                    : "Not yet redeemed"}
                </p>
              </div>
            </div>
          ))}
        </div>
        {currentIndex > 0 && (
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow z-10"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
        )}
        {currentIndex < coupons.length - 3 && (
          <button
            onClick={next}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow z-10"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
}

function BusinessCarousel({ businesses }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef(null);

  const next = () => {
    if (currentIndex < businesses.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      const itemWidth = containerRef.current.offsetWidth / 3;
      setTranslateX(-currentIndex * itemWidth);
    }
  }, [currentIndex]);

  if (businesses.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Your Businesses</h2>
        <p className="text-gray-600">
          You don't have any businesses registered yet.
        </p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-2">Your Businesses</h2>
      <div className="relative">
        <div
          ref={containerRef}
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(${translateX}px)` }}
        >
          {businesses.map((business) => (
            <div key={business.id} className="w-1/3 flex-shrink-0 p-4">
              <div className="bg-white rounded-lg shadow p-4 h-full">
                <h3 className="font-bold text-lg">{business.name}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {business.businessTypes.join(", ")}
                </p>
                <p className="text-gray-700">{business.description}</p>
              </div>
            </div>
          ))}
        </div>
        {currentIndex > 0 && (
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow z-10"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
        )}
        {currentIndex < businesses.length - 3 && (
          <button
            onClick={next}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow z-10"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
}

export default function UserAccount() {
  const handleSignOut = () => {
    // Implement sign out logic here
    console.log("User signed out");
  };

  return (
    <div>
      <AuthNavbar></AuthNavbar>
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-center">
            Welcome back, {user.name}!
          </h1>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                User Information
              </h2>
              <button
                onClick={handleSignOut}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <LogOutIcon className="w-4 h-4 mr-2" />
                Sign Out
              </button>
            </div>

            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Full name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">{user.name}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Coupons Section */}
          <CouponCarousel coupons={user.coupons} />

          {/* Businesses Section */}
          <BusinessCarousel businesses={user.businesses} />
        </div>
      </div>
    </div>
  );
}
