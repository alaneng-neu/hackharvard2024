import { Promotion, PromotionType } from "../../../shared";

export const promotionsToString = (promotions: Promotion[]): string => {
  const topPromotion = promotions[0];

  if (topPromotion.type === PromotionType.PERCENT_DISCOUNT) {
    return `${topPromotion.value}% off`;
  } else {
    return `$${topPromotion.value} off`;
  }
};
