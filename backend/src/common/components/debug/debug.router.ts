import { Router } from "express";
import DebugController from "./debug.controller";

export default class DebugRouter {
  private readonly router = Router();
  private readonly debugController = new DebugController();

  constructor() {
    this.router.get(
      "/ping",
      this.debugController.ping.bind(this.debugController)
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
