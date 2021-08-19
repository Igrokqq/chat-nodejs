import BaseHttpController from "@common/server/http/baseHttpController";
import express from "express";
import {
  InternalServerError,
  NotFound,
  UnprocessableEntity,
} from "http-errors";
import { UserIncorrectPassword, UserNotExistsError } from "../user.errors";
import { JwtLoginResponse } from "./auth.responses";
import AuthService, { STRATEGIES } from "./auth.service";
import JwtStrategy from "./strategies/jwt.strategy";

export default class AuthController extends BaseHttpController {
  private readonly jwtAuthService = new AuthService({
    strategy: STRATEGIES.JWT,
  }) as JwtStrategy;

  async login(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    const loginResponse: JwtLoginResponse = await this.jwtAuthService.login(
      req.body
    );

    if (loginResponse instanceof Error) {
      switch (loginResponse.constructor) {
        case UserNotExistsError:
          return next(new NotFound(loginResponse.message));
        case UserIncorrectPassword:
          return next(new UnprocessableEntity(loginResponse.message));
        default:
          return next(new InternalServerError(loginResponse.message));
      }
    }

    this.ok(res, loginResponse as Record<string, string>);
  }
}
