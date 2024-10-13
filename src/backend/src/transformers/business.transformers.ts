import { Prisma, Location as PrismaLocation } from "@prisma/client";
import { Business, BusinessType, Location } from "../../../shared/index";
import { businessQueryArgs } from "../prisma-query-args/business.query-args";
import { promotionTransformer } from "./promotion.transformers";

export const locationTransformer = (location: PrismaLocation) => {
  if (!location) {
    return null;
  }
  return {
    id: location.id,
    address: location.address,
  };
};

export const businessTransformer = (
  business: Prisma.BusinessGetPayload<typeof businessQueryArgs>
): Business => {
  if (!business) return null;
  return {
    ...business,
    location: locationTransformer(business.location),
    businessTypes: business.businessTypes as BusinessType[],
    promotions: business.promotions.map(promotionTransformer),
  };
};
