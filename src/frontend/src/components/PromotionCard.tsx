import React from "react";
import { Promotion } from "../../../shared";

interface PromotionCardProps {
  promotion: Promotion;
}

const PromotionCard: React.FC<PromotionCardProps> = ({ promotion }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 m-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold">Promotion ID: {promotion.id}</h2>
      <p className="mt-2 text-gray-700">
        <strong>Quantity:</strong> {promotion.quantity}
      </p>
      <p className="mt-2 text-gray-700">
        <strong>Type:</strong> {promotion.type}
      </p>
      <p className="mt-2 text-gray-700">
        <strong>Value:</strong> ${promotion.value}
      </p>
    </div>
  );
};

export default PromotionCard;
