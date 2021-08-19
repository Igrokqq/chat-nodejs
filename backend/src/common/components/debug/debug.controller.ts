import BaseHttpController from "@common/server/http/baseHttpController";
import express from "express";

export default class DebugController extends BaseHttpController {
  ping(_req: express.Request, res: express.Response): void {
    this.ok(res, {
      message: "Pong",
    });
  }
}
