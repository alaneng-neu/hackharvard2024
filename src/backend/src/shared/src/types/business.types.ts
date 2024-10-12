export interface Location {
  address: string;
}

export enum BusinessType {
  FOOD_AND_BEVERAGE = "FOOD_AND_BEVERAGE",
  RETAIL = "RETAIL",
  CLOTHING_AND_ACCESSORIES = "CLOTHING_AND_ACCESSORIES",
  HEALTH_AND_WELLNESS = "HEALTH_AND_WELLNESS",
  ENTERTAINMENT = "ENTERTAINMENT",
  HOSPITALITY = "HOSPITALITY",
  SERVICES = "SERVICES",
  EDUCATION = "EDUCATION",
  TECHNOLOGY = "TECHNOLOGY",
  NON_PROFIT = "NON_PROFIT",
  OTHER = "OTHER",
}

export interface Business {
  id: string;
  location: Location;
  name: string;
  description: string | undefined;
  businessTypes: BusinessType[];
}
