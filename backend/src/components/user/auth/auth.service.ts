import JwtStrategy from "./strategies/jwt.strategy";

export enum STRATEGIES {
  JWT = "jwt",
}
type Options = {
  readonly strategy: STRATEGIES.JWT;
};

export default class AuthService {
  constructor({ strategy }: Options) {
    if (!strategy) {
      throw new Error("Specify strategy for authService");
    }
    switch (strategy) {
      case STRATEGIES.JWT:
        return new JwtStrategy();
      default:
        throw new Error("AuthService has been initialized without strategy");
    }
  }
}
