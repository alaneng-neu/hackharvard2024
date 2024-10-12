import { Prisma } from "@prisma/client";

export const businessQueryArgs = Prisma.validator<Prisma.BusinessDefaultArgs>()(
  {
    include: { location: true },
  }
);
