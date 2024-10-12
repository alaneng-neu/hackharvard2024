import { PromotionType } from "@prisma/client";
import { HttpException } from "./error.utils";

export const isValidPromotionType = (value: string): value is PromotionType => {
  return Object.values(PromotionType).includes(value as PromotionType);
};

export const stringToPromotionType = (promotionType: string): PromotionType => {
  if (!isValidPromotionType(promotionType)) {
    throw new HttpException(400, "Provided an invalid promotion type");
  }

  return promotionType as PromotionType;
};
