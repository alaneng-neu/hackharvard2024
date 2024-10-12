import { Prisma } from "@prisma/client";
import { businessQueryArgs } from "./business.query-args";

export const promotionQueryArgs =
  Prisma.validator<Prisma.PromotionDefaultArgs>()({
    include: {
      business: { ...businessQueryArgs },
    },
  });
