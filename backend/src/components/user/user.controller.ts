import BaseHttpController from "@common/server/http/baseHttpController";
import express from "express";
import { Conflict, InternalServerError } from "http-errors";
import { UserExistsError } from "./user.errors";
import { SignUpResponse } from "./user.responses";
import UserService from "./user.service";

export default class UserController extends BaseHttpController {
  private readonly userService: UserService = new UserService();

  async signUp(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void | never> {
    const signUpResponse: SignUpResponse = await this.userService.signUp(
      req.body
    );

    if (signUpResponse instanceof Error) {
      switch (signUpResponse.constructor) {
        case UserExistsError:
          return next(new Conflict(signUpResponse.message));
        default:
          return next(new InternalServerError(signUpResponse.message));
      }
    }

    this.ok(res, {
      message: "OK",
    });
  }
}
