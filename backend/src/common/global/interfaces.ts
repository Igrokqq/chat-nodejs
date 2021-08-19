import { Connection } from "typeorm";
import { RedisClient } from "redis";
export interface GlobalInterface extends NodeJS.Global {
  pgConnection: Connection;
  redisClient: RedisClient;
}
