import { NextFunction, Request, Response } from "express";
import UserService from "../services/user.services";
import { createCookie } from "../utils/user.utils";

export default class UserController {
  static async loginWithCode(req: Request, res: Response, next: NextFunction) {
    try {
      const { code, scope } = req.body;

      const { refreshToken, idToken, accessToken, expiresIn } =
        await UserService.loginWithCode(code, scope);

      createCookie(res, "accessToken", accessToken, expiresIn * 1000);
      createCookie(res, "idToken", idToken, expiresIn * 1000);
      createCookie(
        res,
        "refreshToken",
        refreshToken,
        180 * 24 * 60 * 60 * 1000
      );
      return res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  }

  static async loginWithRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { refreshToken } = req.cookies;

      const { idToken, accessToken, expiresIn } =
        await UserService.loginWithRefreshToken(refreshToken);

      createCookie(res, "accessToken", accessToken, expiresIn * 1000);
      createCookie(res, "idToken", idToken, expiresIn * 1000);
      return res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  }

  static async verifyAccessToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { accessToken, idToken, refreshToken } = req.cookies;

      const status = await UserService.verifyAccessToken(
        accessToken,
        idToken,
        refreshToken
      );
      return res.status(200).json(status);
    } catch (error) {
      next(error);
    }
  }

  static async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { accessToken, idToken, refreshToken } = req.cookies;

      const user = await UserService.getUser(
        accessToken,
        idToken,
        refreshToken
      );
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async logout(_req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie("refreshToken", { path: "/" });
      res.clearCookie("accessToken", { path: "/" });
      res.clearCookie("idToken", { path: "/" });

      return res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}
