import { UnprocessableEntity } from "http-errors";
import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import express from "express";
import { RequestValidationParams } from "./interfaces";

export default class RequestValidation {
  static getHandler({
    dto,
    sourcePropertyName,
  }: RequestValidationParams): express.Handler {
    return async (
      req: express.Request,
      _res: express.Response,
      next: express.NextFunction
    ) => {
      const errors: ValidationError[] = await validate(
        plainToClass(dto, req[sourcePropertyName])
      );

      if (errors.length) {
        return next(
          new UnprocessableEntity(
            errors
              .map((error: ValidationError) => {
                return Object.values(error.constraints).join();
              })
              .join()
          )
        );
      }

      next();
    };
  }
}
