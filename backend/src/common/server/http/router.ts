import DebugRouter from "@common/components/debug/debug.router";
import ChatRouter from "@components/chat/chat.router";
import AuthRouter from "@components/user/auth/auth.router";
import UserRouter from "@components/user/user.router";
import express from "express";

export default class Router {
  static init(app: express.Application): void {
    app.use("/", new DebugRouter().getRouter());
    app.use("/users", new UserRouter().getRouter());
    app.use("/chat", new ChatRouter().getRouter());
    app.use("/auth", new AuthRouter().getRouter());
  }
}
