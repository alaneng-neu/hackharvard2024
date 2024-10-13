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
businessRouter.post(
  "/:businessId/promos/:couponId/redeem",
  BusinessController.redeemCoupon
);

export default businessRouter;
