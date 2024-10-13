import { Prisma } from "@prisma/client";
import { businessQueryArgs } from "./business.query-args";

export const userQueryArgs = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: {
    businesses: businessQueryArgs,
    coupons: true,
  },
});
