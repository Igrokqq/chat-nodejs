import { UserIncorrectPassword, UserNotExistsError } from "../user.errors";
import { JwtTokens } from "./strategies/jwt.strategy";

export type JwtLoginResponse =
  | UserNotExistsError
  | UserIncorrectPassword
  | JwtTokens;
