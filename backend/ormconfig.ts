import config from "./src/common/config";

const { host, port, username, password, database } = config.databases.pg;

export default {
  host,
  port,
  username,
  password,
  database,
  type: "postgres",
  synchronize: false,
  logging: false,
  entities: ["src/components/**/*.entity.ts", "dist/components/**/*.entity.js"],
  migrations: ["src/common/database/pg/migration/**/*.ts"],
  subscribers: ["src/common/database/pg/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/components",
    migrationsDir: "src/common/database/pg/migration",
    subscribersDir: "src/common/database/pg/subscriber",
  },
};
