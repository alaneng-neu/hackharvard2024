import { useEffect, useState } from "react";
import { MapPin, Store, Tag, Percent, Plus } from "lucide-react";
import Navbar from "../components/Navbar";
import { Business } from "../../../shared";
import { useParams } from "react-router-dom";
import { promotionToString } from "../utils/business.utils";

const businessTypeLabels = {
  FOOD_AND_BEVERAGE: "Food & Beverage",
  RETAIL: "Retail",
  CLOTHING_AND_ACCESSORIES: "Clothing & Accessories",
  HEALTH_AND_WELLNESS: "Health & Wellness",
  ENTERTAINMENT: "Entertainment",
  HOSPITALITY: "Hospitality",
  SERVICES: "Services",
  EDUCATION: "Education",
  TECHNOLOGY: "Technology",
  NON_PROFIT: "Non-Profit",
  OTHER: "Other",
};

const BusinessPage = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState<Business>();
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "details",
    "promotions",
  ]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    fetch(`http://localhost:7071/business/${id}/get`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) throw new Error(data.message);
        setBusiness(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [id]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  return (
    <div>
      <Navbar></Navbar>
      {business && (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <header className="bg-white shadow rounded-lg mb-6">
              <div className="px-4 py-5 sm:px-6">
                <h1 className="text-3xl font-bold text-gray-900">
                  {business.name}
                </h1>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {business.description}
                </p>
              </div>
            </header>
          </div>

          <main>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
              <div
                className="px-4 py-5 sm:px-6 flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection("details")}>
                <h2 className="text-lg font-medium text-gray-900">
                  Business Details
                </h2>
                <span className="text-gray-400">
                  {expandedSections.includes("details") ? "-" : "+"}
                </span>
              </div>
              {expandedSections.includes("details") && (
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                  <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500 flex items-center">
                        <MapPin className="w-5 h-5 mr-2" />
                        Address
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {business.location.address}
                      </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500 flex items-center">
                        <Store className="w-5 h-5 mr-2" />
                        Business Types
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {business.businessTypes
                          .map((type) => businessTypeLabels[type])
                          .join(", ")}
                      </dd>
                    </div>
                  </dl>
                </div>
              )}
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div
                className="px-4 py-5 sm:px-6 flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection("promotions")}>
                <h2 className="text-lg font-medium text-gray-900">
                  Current Promotions
                </h2>
                <span className="text-gray-400">
                  {expandedSections.includes("promotions") ? "-" : "+"}
                </span>
              </div>
              {expandedSections.includes("promotions") && (
                <div className="border-t border-gray-200">
                  {business.promotions.map((promotion, index) => (
                    <div
                      key={promotion.id}
                      className={`px-4 py-5 sm:p-6 ${
                        index !== business.promotions.length - 1
                          ? "border-b border-gray-200"
                          : ""
                      }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {promotion.type === "PERCENT_DISCOUNT" ? (
                            <Percent className="w-5 h-5 mr-2 text-green-500" />
                          ) : (
                            <Tag className="w-5 h-5 mr-2 text-blue-500" />
                          )}
                          <span className="text-lg font-medium text-gray-900">
                            {promotionToString(promotion)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => {}}
                            className="bg-[#5aa157] hover:bg-[#3f6b3d] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          >
                            Redeem
                          </button>
                        </div>
                        <span className="text-sm text-gray-500">
                          {promotion.quantity} available
                        </span>
                      </div>
                    </div>
                  ))}
                  <div className="px-4 py-5 sm:p-6">
                    <button
                      onClick={() =>
                        (window.location.href = `/business/${business.id}/promo/create`)
                      }
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600">
                      <Plus className="w-5 h-5 mr-2" />
                      Create New Promo
                    </button>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      )}
      {error && (
        <div className="text-red-500 text-center mt-6">Error: {error}</div>
      )}
    </div>
  );
};

export default BusinessPage;
