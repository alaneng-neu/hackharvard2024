import { BusinessType } from "@prisma/client";
import { HttpException } from "./error.utils";

export const isValidBusinessType = (value: string): value is BusinessType => {
  return Object.values(BusinessType).includes(value as BusinessType);
};

export const stringToBusinessType = (businessType: string): BusinessType => {
  if (!isValidBusinessType(businessType)) {
    throw new HttpException(400, "Provided an invalid business type");
  }

  return businessType as BusinessType;
};
