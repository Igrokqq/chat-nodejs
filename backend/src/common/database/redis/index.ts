import { ClientOpts, createClient, RedisClient } from "redis";

type Record = string | undefined;
type RedisSetOptions = {
  readonly ttl?: number;
};
export default class Redis {
  private client: RedisClient | undefined;
  private config: ClientOpts;

  private initLifecycleEvents(client: RedisClient): void {
    client.on("ready", (): void => {
      console.log(`Redis is running on ${this.config.url} path`);
    });
    client.on("reconnecting", (): void => {
      console.log(
        `Redis is trying to reconnect using the ${this.config.url} path`
      );
    });
    client.on("error", (error: Error): void => {
      console.error("Redis failed", error);
    });
    client.on("warning", (value: string): void => {
      console.log(`Redis has warnings ${value}`);
    });
    client.on("end", (): void => {
      console.info("Redis connection was closed");
    });
  }

  connect(config: ClientOpts): Redis {
    const client: RedisClient = createClient(config);
    this.initLifecycleEvents(client);
    this.client = client;
    this.config = config;

    return this;
  }

  get(key: string): Promise<Record | never> {
    return new Promise((resolve, reject) => {
      this.client.get(key, (error: Error, record: Record) => {
        if (error) {
          return reject(error);
        }
        resolve(record);
      });
    });
  }

  set(
    key: string,
    data: string,
    options?: RedisSetOptions
  ): Promise<"OK" | never> {
    return new Promise((resolve, reject) => {
      const callback = (error: Error, result: "OK") => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      };
      if (options.ttl) {
        this.client.set(key, data, "EX", options.ttl, callback);
      } else {
        this.client.set(key, data, callback);
      }
    });
  }
}
