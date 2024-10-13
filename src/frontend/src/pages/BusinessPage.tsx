import { useState } from "react";
import { MapPin, Store, Tag, Percent } from "lucide-react";
import Navbar from "../components/Navbar";

// Mock data based on the Prisma schema
const business = {
  id: "1",
  name: "Sample Business",
  description: "This is a sample business description.",
  businessTypes: ["FOOD_AND_BEVERAGE", "RETAIL"],
  location: {
    address: "123 Main St, Anytown, USA",
  },
  promotions: [
    { id: "1", type: "PERCENT_DISCOUNT", value: 10, quantity: 100 },
    { id: "2", type: "VALUE_DISCOUNT", value: 5, quantity: 50 },
  ],
};

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

export default function BusinessPage() {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "details",
    "promotions",
  ]);

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
              onClick={() => toggleSection("details")}
            >
              <h2 className="text-lg font-medium text-gray-900">
                Business Details
              </h2>
              <span className="text-gray-400">
                {expandedSections.includes("details") ? "−" : "+"}
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
              onClick={() => toggleSection("promotions")}
            >
              <h2 className="text-lg font-medium text-gray-900">
                Current Promotions
              </h2>
              <span className="text-gray-400">
                {expandedSections.includes("promotions") ? "−" : "+"}
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
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {promotion.type === "PERCENT_DISCOUNT" ? (
                          <Percent className="w-5 h-5 mr-2 text-green-500" />
                        ) : (
                          <Tag className="w-5 h-5 mr-2 text-blue-500" />
                        )}
                        <span className="text-lg font-medium text-gray-900">
                          {promotion.type === "PERCENT_DISCOUNT"
                            ? `${promotion.value}% off`
                            : `$${promotion.value} off`}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {promotion.quantity} available
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
