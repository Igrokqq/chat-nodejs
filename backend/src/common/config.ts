export default {
  envMode: {
    isDevelopment: process.env.NODE_ENV === "dev",
    isStaging: process.env.NODE_ENV === "stage",
    isProduction: process.env.NODE_ENV === "prod",
  },
  databases: {
    pg: {
      host: process.env.PG_HOST,
      port: process.env.PG_PORT,
      username: process.env.PG_USER,
      password: process.env.PG_PASS,
      database: process.env.PG_DB,
    },
    redis: {
      url: process.env.REDIS_URL,
      password: process.env.REDIS_PASS,
    },
  },
  auth: {
    jwt: {
      accessSecret: process.env.JWT_ACCESS_SECRET,
      accessLifeTime: process.env.JWT_ACCESS_LIFETIME,
      refreshSecret: process.env.JWT_REFRESH_SECRET,
      refreshLifeTime: process.env.JWT_REFRESH_LIFETIME,
      refreshTtl: parseInt(process.env.JWT_REFRESH_TTL, 10),
    },
  },
  server: {
    http: {
      port: process.env.PORT,
      corsOptions: {
        origin: "*",
      },
    },
    socketIo: {
      port: process.env.SOCKETIO_PORT,
    },
  },
};
