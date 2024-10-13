import { Prisma } from "@prisma/client";
import { promotionQueryArgs } from "./promotion.query-args";
import { userQueryArgs } from "./user.query-args";

export const couponQueryArgs = Prisma.validator<Prisma.CouponDefaultArgs>()({
  include: {
    promotion: promotionQueryArgs,
    user: userQueryArgs,
  },
});
