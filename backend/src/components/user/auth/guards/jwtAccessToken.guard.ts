import express from "express";
import AuthService, { STRATEGIES } from "../auth.service";
import { Unauthorized } from "http-errors";
import config from "@common/config";
import JwtStrategy from "../strategies/jwt.strategy";

export default class JwtAccessTokenGuard {
  static getHandler() {
    return async (
      req: express.Request,
      _res: express.Response,
      next: express.NextFunction
    ): Promise<void> => {
      const jwtAuthService = new AuthService({
        strategy: STRATEGIES.JWT,
      }) as JwtStrategy;
      const token: string | undefined = req.headers.authorization
        ? req.headers.authorization.split(" ")[1]
        : undefined;

      if (!token) {
        return next(new Unauthorized("Jwt access token is missing"));
      }

      try {
        await jwtAuthService.decodeToken(token, config.auth.jwt.accessSecret);
        next();
      } catch (error) {
        return next(new Unauthorized("Jwt access token is incorrect"));
      }
    };
  }
}
