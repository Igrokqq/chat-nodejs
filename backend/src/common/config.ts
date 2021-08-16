export default {
  envMode: {
    isDevelopment: process.env.NODE_ENV === "dev",
    isStaging: process.env.NODE_ENV === "stage",
    isProduction: process.env.NODE_ENV === "prod",
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
