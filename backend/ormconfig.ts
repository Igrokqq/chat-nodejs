export default {
  type: "postgres",
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  username: process.env.PG_USER,
  password: process.env.PG_PASS,
  database: process.env.PG_DB,
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
