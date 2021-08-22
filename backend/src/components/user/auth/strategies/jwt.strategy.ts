import jwt from "jsonwebtoken";
import { AuthStrategy } from "../interfaces";
import config from "@common/config";
import GlobalManager from "@common/global/manager";
import Redis from "@common/database/redis";
import LoginDto from "../dto/login.dto";
import { UserClaimsInterface } from "@components/user/interfaces";
import UserRepository from "@components/user/user.repository";
import {
  UserIncorrectPassword,
  UserNotExistsError,
} from "@components/user/user.errors";
import { JwtLoginResponse } from "../auth.responses";
import { UserEntity } from "@components/user/user.entity";
import LogoutDto from "../dto/logout.dto";

export type JwtTokens = {
  readonly accessToken: string;
  readonly refreshToken: string;
};

export default class JwtStrategy implements AuthStrategy {
  private readonly redis: Redis = GlobalManager.getProperty(
    "redisClient"
  ) as Redis;
  private readonly userRepository = new UserRepository();

  async login(dto: LoginDto): Promise<JwtLoginResponse> {
    const user: UserEntity = await this.userRepository.getOneByEmail(dto.email);

    if (!user) {
      return new UserNotExistsError();
    }

    if (dto.password !== user.password) {
      return new UserIncorrectPassword(dto.password);
    }
    const { refreshLifeTime, refreshSecret, accessSecret, accessLifeTime } =
      config.auth.jwt;
    const claims: UserClaimsInterface = {
      email: dto.email,
    };
    const accessToken: string = jwt.sign(claims, accessSecret, {
      expiresIn: accessLifeTime,
    });
    const refreshToken: string = jwt.sign(claims, refreshSecret, {
      expiresIn: refreshLifeTime,
    });

    const userRefreshTokensKey = `user-refresh-tokens-${claims.email}`;
    const refreshTokens: string | undefined = await this.redis.get(
      userRefreshTokensKey
    );

    this.redis.set(
      userRefreshTokensKey,
      JSON.stringify(
        refreshTokens
          ? [...JSON.parse(refreshTokens), refreshToken]
          : [refreshToken]
      ),
      {
        ttl: config.auth.jwt.refreshTtl,
      }
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  decodeToken(
    token: string,
    secret: string
  ): Promise<UserClaimsInterface | false> {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        secret,
        (error: Error, decoded: UserClaimsInterface) => {
          if (error) {
            return reject(false);
          }
          delete decoded.iat;
          delete decoded.exp;

          resolve(decoded);
        }
      );
    });
  }

  async logout(dto: LogoutDto): Promise<void> {
    const userRefreshTokensKey = `user-refresh-tokens-${dto.email}`;
    const refreshTokens: string | undefined = await this.redis.get(
      `user-refresh-tokens-${dto.email}`
    );

    await this.redis.set(
      userRefreshTokensKey,
      refreshTokens
        ? JSON.stringify(
            JSON.parse(refreshTokens).filter(
              (token: string): boolean => token !== dto.refreshToken
            )
          )
        : undefined,
      {
        ttl: config.auth.jwt.refreshTtl,
      }
    );
  }
}
