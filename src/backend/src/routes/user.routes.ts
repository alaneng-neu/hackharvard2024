import { Router } from "express";
import UserController from "../controllers/user.controllers";

const userRouter = Router();

userRouter.post(
  "/login/code",
  UserController.loginWithCode.bind(UserController)
);
userRouter.post(
  "/login/refresh-token",
  UserController.loginWithRefreshToken.bind(UserController)
);

userRouter.get("/vat", UserController.verifyAccessToken.bind(UserController));
userRouter.get("/get", UserController.getUser.bind(UserController));
userRouter.get("/logout", UserController.logout.bind(UserController));

export default userRouter;
