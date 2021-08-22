import config from "@common/config";
import BaseHttpController from "@common/server/http/baseHttpController";
import express from "express";
import {
  InternalServerError,
  NotFound,
  UnprocessableEntity,
} from "http-errors";
import { UserClaimsInterface } from "../interfaces";
import { UserIncorrectPassword, UserNotExistsError } from "../user.errors";
import { GetUserByEmailResponse } from "../user.responses";
import UserService from "../user.service";
import { JwtLoginResponse } from "./auth.responses";
import AuthService, { STRATEGIES } from "./auth.service";
import JwtStrategy from "./strategies/jwt.strategy";

export default class AuthController extends BaseHttpController {
  private readonly jwtAuthService = new AuthService({
    strategy: STRATEGIES.JWT,
  }) as JwtStrategy;
  private readonly userService = new UserService();

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

  async getUserFromAccessToken(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    const token: string = req.headers.authorization.split(" ")[1] || "";
    // we already checked this token before in a separate guard and can be confident in this truth
    const decoded = (await this.jwtAuthService.decodeToken(
      token,
      config.auth.jwt.accessSecret
    )) as UserClaimsInterface;

    const getUserByEmailResponse: GetUserByEmailResponse =
      await this.userService.getUserByEmail(decoded.email);

    if (getUserByEmailResponse instanceof UserNotExistsError) {
      return next(new NotFound(getUserByEmailResponse.message));
    }
    return this.ok(res, {
      body: getUserByEmailResponse,
    });
  }

  async logout(req: express.Request, res: express.Response): Promise<void> {
    this.jwtAuthService.logout(req.body);

    this.ok(res, {
      message: "OK",
    });
  }
}
