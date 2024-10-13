import { Prisma } from "@prisma/client";
import { Promotion, PromotionType } from "../../../shared";
import { businessTransformer } from "./business.transformers";
import { promotionQueryArgs } from "../prisma-query-args/promotion.query-args";

export const promotionTransformer = (
  promotion: Prisma.PromotionGetPayload<typeof promotionQueryArgs>
): Promotion => {
  return {
    ...promotion,
    business: businessTransformer(promotion.business),
    type: promotion.type as PromotionType,
  };
};
