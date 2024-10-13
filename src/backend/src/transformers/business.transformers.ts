import { Prisma, Location as PrismaLocation } from "@prisma/client";
import { Business, BusinessType, Location } from "../../../shared/index";
import { businessQueryArgs } from "../prisma-query-args/business.query-args";
import { promotionTransformer } from "./promotion.transformers";

export const locationTransfomer = (location: PrismaLocation): Location => {
  return { address: location.address };
};

export const businessTransformer = (
  business: Prisma.BusinessGetPayload<typeof businessQueryArgs>
): Business => {
  return {
    ...business,
    location: locationTransfomer(business.location),
    businessTypes: business.businessTypes as BusinessType[],
    promotions: business.promotions.map(promotionTransformer),
  };
};
