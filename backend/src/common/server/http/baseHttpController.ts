import express from "express";
import { OkResponseInterface } from "./interfaces";

export default class BaseHttpController {
  ok(res: express.Response, body: OkResponseInterface): void {
    res.status(200).json(body);
  }
}
