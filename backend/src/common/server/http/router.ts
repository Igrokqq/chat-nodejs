import ChatRouter from "@components/chat/chat.router";
import UserRouter from "@components/user/user.router";
import express from "express";

export default class Router {
  static init(app: express.Application): void {
    app.use("/users", new UserRouter().getRouter());
    app.use("/chat", new ChatRouter().getRouter());
  }
}
