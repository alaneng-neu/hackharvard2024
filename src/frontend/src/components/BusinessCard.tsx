import React from "react";
import { Business } from "../../../shared/index.ts";
import {
  formatCategoryName,
  promotionToString,
} from "../utils/business.utils.ts";

interface BusinessCardProps {
  business: Business;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
  return (
    <div className="business-card rounded-lg overflow-hidden shadow-md bg-gray-800 text-white flex flex-col h-full">
      <div className="relative">
        {/* TODO: Replace image placeholder with business image */}
        <img
          src={"https://via.placeholder.com/150"}
          alt={business.name}
          className="w-full h-48 object-cover"
        />
        {business.promotions.length > 0 && (
          <div className="absolute top-4 left-4 bg-yellow-500 text-black px-2 py-1 rounded-md text-sm font-bold">
            {promotionToString(business.promotions[0])}
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-bold">{business.name}</h2>
        <div className="flex flex-wrap gap-2 my-2">
          {business.businessTypes.map((type) => (
            <span
              key={type}
              className="bg-gray-600 rounded-full px-3 py-1 text-xs font-semibold">
              {formatCategoryName(type)}
            </span>
          ))}
        </div>
        <p className="text-sm mb-4">{business.description}</p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-xs">{business.location.address}</span>
          <button className="text-sm font-semibold text-yellow-500">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
