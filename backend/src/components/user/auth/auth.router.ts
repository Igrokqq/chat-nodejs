import RequestValidation from "@common/server/http/requestValidation";
import express from "express";
import AuthController from "./auth.controller";
import LoginDto from "./dto/login.dto";
import LogoutDto from "./dto/logout.dto";
import JwtAccessTokenGuard from "./guards/jwtAccessToken.guard";

export default class AuthRouter {
  private readonly router = express.Router();
  private readonly authController = new AuthController();

  constructor() {
    this.router.post(
      "/login",
      RequestValidation.getHandler({
        dto: LoginDto,
        sourcePropertyName: "body",
      }),
      this.authController.login.bind(this.authController)
    );
    this.router.get(
      "/me",
      JwtAccessTokenGuard.getHandler(),
      this.authController.getUserFromAccessToken.bind(this.authController)
    );
    this.router.delete(
      "/logout",
      [
        JwtAccessTokenGuard.getHandler(),
        RequestValidation.getHandler({
          dto: LogoutDto,
          sourcePropertyName: "body",
        }),
      ],
      this.authController.logout.bind(this.authController)
    );
  }
  getRouter(): express.Router {
    return this.router;
  }
}
