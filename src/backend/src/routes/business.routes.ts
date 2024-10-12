import { Router } from "express";
import BusinessController from "../controllers/business.controllers";

const businessRouter = Router();

businessRouter.post("/new", BusinessController.createNewBusiness);

businessRouter.get("/search", BusinessController.getAllBusinesses);
businessRouter.get("/types", BusinessController.getBusinessTypes);

businessRouter.get("/:businessId/get", BusinessController.getBusiness);
businessRouter.get("/:businessId/edit", BusinessController.editBusiness);

businessRouter.get("/:businessId/promos", BusinessController.getPromos);
businessRouter.get("/:businessId/promos/new", BusinessController.createPromo);
businessRouter.get(
  "/:businessId/promos/:couponId/redeem",
  BusinessController.redeemCoupon
);

export default businessRouter;
