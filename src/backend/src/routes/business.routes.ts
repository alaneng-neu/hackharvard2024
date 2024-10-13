import { Router } from "express";
import BusinessController from "../controllers/business.controllers";

const businessRouter = Router();

businessRouter.post("/create", BusinessController.createNewBusiness);

businessRouter.get("/search", BusinessController.getAllBusinesses);
businessRouter.get("/types", BusinessController.getBusinessTypes);

businessRouter.get("/:businessId/get", BusinessController.getBusiness);
businessRouter.post("/:businessId/edit", BusinessController.editBusiness);

businessRouter.get("/:businessId/promos", BusinessController.getPromos);
businessRouter.post("/:businessId/promos/new", BusinessController.createPromo);
businessRouter.get(
  "/:businessId/promos/:couponId",
  BusinessController.getCoupon
);
businessRouter.post(
  "/:businessId/promos/:couponId/redeem",
  BusinessController.redeemPromo
);
businessRouter.post(
  "/:businessId/promos/:couponId/use",
  BusinessController.useCoupon
);

export default businessRouter;
