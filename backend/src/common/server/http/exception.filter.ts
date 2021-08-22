import express from "express";
import {
  Conflict,
  NotFound,
  Unauthorized,
  UnprocessableEntity,
} from "http-errors";

export default class HttpExceptionFilter {
  static listenExceptions(
    error: Error,
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): express.Response | void {
    if (res.headersSent) {
      return next(error);
    }

    if (error instanceof NotFound) {
      return res.status(404).json({
        error: error.message,
      });
    }
    if (error instanceof UnprocessableEntity) {
      return res.status(422).json({
        error: error.message,
      });
    }
    if (error instanceof Conflict) {
      return res.status(409).json({
        error: error.message,
      });
    }
    if (error instanceof Unauthorized) {
      return res.status(401).json({
        error: error.message,
      });
    }
    res.status(500).json({
      error: error.message,
    });
  }
}
