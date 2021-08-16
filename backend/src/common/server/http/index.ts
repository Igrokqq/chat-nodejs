import express from "express";
import config from "@common/config";
import { ServerInterface } from "../interfaces";
import * as hooks from "./hooks";
import Dependencies from "./dependencies";
import Router from "./router";
import HttpExceptionFilter from "./exception.filter";

export default class HttpServer implements ServerInterface {
  async run(): Promise<void> {
    const app: express.Application = express();
    new Dependencies().applyTo(app);

    Router.init(app);
    app.use(HttpExceptionFilter.listenExceptions);

    app.listen(
      config.server.http.port,
      hooks.onConnected.bind(null, config.server.http.port)
    );
  }
}
