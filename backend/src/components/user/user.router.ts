import RequestValidation from "@common/server/http/requestValidation";
import express from "express";
import CreateUserDto from "./dto/create-user.dto";
import UserController from "./user.controller";

export default class UserRouter {
  private readonly router: express.Router = express.Router();
  private readonly userController: UserController = new UserController();

  constructor() {
    this.router.post(
      "/signUp",
      RequestValidation.getHandler({
        dto: CreateUserDto,
        sourcePropertyName: "body",
      }),
      this.userController.signUp.bind(this.userController)
    );
  }

  getRouter(): express.Router {
    return this.router;
  }
}
