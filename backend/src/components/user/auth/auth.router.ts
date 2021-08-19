import RequestValidation from "@common/server/http/requestValidation";
import express from "express";
import AuthController from "./auth.controller";
import LoginDto from "./dto/login.dto";

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
  }
  getRouter(): express.Router {
    return this.router;
  }
}
